import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  Avatar,
  Button,
  Divider,
  Icon,
  Image,
  ListItem,
  Text,
} from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { PostList } from '../../components/post';
import { DEVICE_WIDTH } from '../../constants/dimensions';
import { auth, friend, post } from '../../apis';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/core';
import { stacks } from '../../constants/title';
import { ASSET_API_URL } from '../../configs';
import FRIEND_STATUS from '../../constants/friendStatus';
import { Toast } from '../../helpers';
import { hideModal, showModal } from '../../redux/reducers/modalReducer';
import { types } from '../../constants/modalTypes';
import convertToBase64 from '../../helpers/Base64Convert';
import { Toast } from '../../helpers';
import { LogBox } from 'react-native';
import { mediaActions } from '../../redux/actions';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Profile = (props) => {
  const user = useSelector((state) => state.auth.user);
  const [userData, setUserData] = useState({ info: {}, posts: [] });
  const [userId, setUserId] = useState(null);
  const [isFirstLoad, setFirstLoad] = useState(false);
  const [friendStatus, setFriendStatus] = useState(FRIEND_STATUS.NON_FRIEND);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [profileImgUris, setProfileImgUris] = useState({
    avatar: null,
    coverImage: null,
  });

  const dispatch = useDispatch();

  const selectedAssets = useSelector((state) => state.media.selectedAssets);

  const fetchUserInfo = async (userId) => {
    try {
      const infoResult = await auth.showInfo(userId, user.token);
      return infoResult.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserPosts = async (userId) => {
    try {
      const postListResult = await post.getListPost(userId, user.token);
      return postListResult.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const initializeUserProfile = async (userId) => {
    const info = await fetchUserInfo(userId);
    const posts = await fetchUserPosts(userId);
    setUserData({ info, posts });
    setFirstLoad(false);
  };

  const handleAddFriend = async () => {
    try {
      await friend.sendFriendRequest(userId, user.token);
      setFriendStatus(FRIEND_STATUS.SEND_REQUEST);
    } catch (error) {
      console.log(error);
      Toast.showFailureMessage('Error adding friend');
    }
  };

  const handleCancelFriendRequest = async () => {
    try {
      await friend.cancelFriendRequest(userId, user.token);
      setFriendStatus(FRIEND_STATUS.NON_FRIEND);
    } catch (error) {
      console.log(error.response);
      Toast.showFailureMessage('Error canceling friend request');
    }
  };

  const handleUnfriend = async () => {
    try {
      await friend.removeFriend(userId, user.token);
      setFriendStatus(FRIEND_STATUS.NON_FRIEND);
      dispatch(hideModal());
    } catch (error) {
      console.log(error);
      Toast.showFailureMessage('Error unfriending this person');
    }
  };

  handleUpdateFriendStatus = (isAccept) => {
    if (isAccept) {
      setFriendStatus(FRIEND_STATUS.FRIENDS);
    } else {
      setFriendStatus(FRIEND_STATUS.NON_FRIEND);
    }
  };

  const handleShowRespondModal = () => {
    dispatch(
      showModal({
        modalType: types.respondModal,
        propsData: {
          otherUserId: userId,
          callback: handleUpdateFriendStatus,
        },
      }),
    );
  };

  const handleShowUnfriendConfirm = () => {
    dispatch(
      showModal({
        modalType: types.confirm,
        propsData: {
          isModalVisible: true,
          title: 'Remove friend',
          content: 'Are you sure you want to remove this person as a friend?',
          yesOptionTitle: 'Unfriend',
          noOptionTitle: 'Cancel',
          handleCancel: () => dispatch(hideModal()),
          handleConfirm: handleUnfriend,
        },
      }),
    );
  };

  const handleFriendBtnPress = () => {
    switch (friendStatus) {
      case FRIEND_STATUS.NON_FRIEND:
        handleAddFriend();
        break;

      case FRIEND_STATUS.SEND_REQUEST:
        handleCancelFriendRequest();
        break;

      case FRIEND_STATUS.REQUESTED:
        handleShowRespondModal();
        break;

      case FRIEND_STATUS.FRIENDS:
        handleShowUnfriendConfirm();
    }
  };

  const getDate = (value) => {
    let result = '';
    let date = new Date(value);
    result += `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `;
    return result;
  };

  const getIconByFriendStatus = () => {
    if (friendStatus == FRIEND_STATUS.NON_FRIEND) {
      return {
        name: 'account-plus',
        type: 'material-community',
      };
    } else if (friendStatus == FRIEND_STATUS.SEND_REQUEST) {
      return {
        name: 'account-arrow-right',
        type: 'material-community',
      };
    }
    return {
      name: 'account-check',
      type: 'material-community',
    };
  };

  const getFriendBtnTitleByStatus = () => {
    switch (friendStatus) {
      case FRIEND_STATUS.NON_FRIEND:
        return 'Add friend';

      case FRIEND_STATUS.SEND_REQUEST:
        return 'Requested';

      case FRIEND_STATUS.REQUESTED:
        return 'Respond';

      case FRIEND_STATUS.FRIENDS:
        return 'Friends';
    }
  };

  useEffect(() => {
    if (route.params && route.params.userId) {
      setUserId(route.params.userId);
    } else {
      setUserId(user.id);
    }
  }, [route]);

  useEffect(() => {
    if (userId) {
      setFirstLoad(true);
    }
  }, [userId]);

  useEffect(() => {
    if (isFirstLoad) {
      initializeUserProfile(userId);
    }
  }, [isFirstLoad]);

  useEffect(() => {
    const friendStatus = userData.info.friendStatus;
    const info = userData.info;

    if (info.avatar && info.cover_image) {
      setProfileImgUris({
        avatar: `${ASSET_API_URL}/${info.avatar.fileName}`,
        coverImage: `${ASSET_API_URL}/${info.cover_image.fileName}`,
      });
    }

    if (!friendStatus) {
      setFriendStatus(FRIEND_STATUS.NON_FRIEND);
    } else {
      if (friendStatus.status != '0' && friendStatus.status != '1') {
        setFriendStatus(FRIEND_STATUS.NON_FRIEND);
      } else if (friendStatus.status == '1') {
        setFriendStatus(FRIEND_STATUS.FRIENDS);
      } else if (friendStatus.sender == user.id) {
        setFriendStatus(FRIEND_STATUS.SEND_REQUEST);
      } else {
        setFriendStatus(FRIEND_STATUS.REQUESTED);
      }
    }
  }, [userData]);

  const handleUpdateProfileImg = async (type) => {
    const base64Assets = await convertToBase64(selectedAssets);
    const imageToUpload = base64Assets[0];
    console.log('image: ', imageToUpload);

    let updateData = {
      [type]: imageToUpload,
    };

    try {
      const editRes = await auth.editInfo(updateData, user.token);
      const userInfo = editRes.data.data;
      console.log('user info: ', userInfo);

      setProfileImgUris({
        avatar: `${ASSET_API_URL}/${userInfo.avatar.fileName}`,
        coverImage: `${ASSET_API_URL}/${userInfo.cover_image.fileName}`,
      });
      dispatch(mediaActions.resetState());
      const successMsg =
        type == 'avatar'
          ? 'Update avatar succesfully'
          : 'Update cover image successfully';
      Toast.showSuccessMessage(successMsg);
    } catch (error) {
      console.log('error');
      const errMsg =
        type == 'avatar'
          ? 'Error updating avatar'
          : 'Error updating cover image';
      Toast.showFailureMessage(errMsg);
    }
  };

  const handleUpdateAvatar = () => handleUpdateProfileImg('avatar');

  const handleUpdateCoverImage = () => handleUpdateProfileImg('cover_image');

  const renderUserActionButtons = () => {
    if (!userId) {
      return null;
    }

    if (userId === user.id) {
      return (
        <>
          <Button
            buttonStyle={styles.addPostBtn}
            title="Add post"
            icon={{
              type: 'antdesign',
              name: 'pluscircle',
              color: 'rgb(255,255,255)',
              size: 18,
            }}
            titleStyle={{
              color: 'rgb(255,255,255)',
            }}
            onPress={() => navigation.navigate(stacks.createPost.name)}
          />

          <Button
            buttonStyle={styles.updateProfileBtn}
            title="Edit profile"
            icon={{
              type: 'antdesign',
              name: 'edit',
              color: 'rgb(0,0,0)',
              size: 18,
            }}
            titleStyle={{
              color: 'rgb(0,0,0)',
            }}
            onPress={() => navigation.navigate(stacks.personalInformation.name)}
          />
        </>
      );
    }

    const friendBtnTitle = getFriendBtnTitleByStatus();
    const { name: iconName, type: iconType } = getIconByFriendStatus();

    return (
      <>
        <Button
          buttonStyle={styles.addFriendBtn}
          title={friendBtnTitle}
          icon={{
            type: iconType,
            name: iconName,
            color: 'rgb(255,255,255)',
            size: 18,
          }}
          titleStyle={{
            fontWeight: '100',
            color: 'rgb(255,255,255)',
          }}
          onPress={handleFriendBtnPress}
        />

        <Button
          buttonStyle={styles.messageBtn}
          onPress={() =>
            navigation.navigate(stacks.chatScreen.name, {
              receivedId: userId,
            })
          }
          title="Message"
          icon={{
            type: 'fontisto',
            name: 'messenger',
            color: 'rgb(255,255,255)',
            size: 18,
          }}
          titleStyle={{
            fontWeight: '100',
            color: 'rgb(255,255,255)',
          }}
        />
      </>
    );
  };

  const ProfileHeader = () => {
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground
            source={{
              uri: profileImgUris.coverImage,
            }}
            alt="This is cover image"
            style={styles.cover}
          >
            <Icon
              name="camera"
              type="entypo"
              size={30}
              style={{
                margin: 12,
                padding: 8,
                backgroundColor: 'rgb(230, 230, 230)',
                borderRadius: 24,
              }}
              onPress={() =>
                navigation.navigate(stacks.mediaPicker.name, {
                  isSingleSelect: true,
                  handleBack: handleUpdateCoverImage,
                })
              }
            />
          </ImageBackground>
        </View>
        <View style={styles.profileOutterContainer}>
          <View style={styles.profileInnerContainer}>
            <Avatar
              rounded
              size={88}
              source={{
                uri: profileImgUris.avatar,
              }}
              onPress={() => console.log('Pressed on avatar!')}
            />
            <Avatar.Accessory
              name="camera"
              type="entypo"
              size={24}
              color="black"
              style={{
                backgroundColor: 'rgb(230, 230, 230)',
              }}
              onPress={() =>
                navigation.navigate(stacks.mediaPicker.name, {
                  isSingleSelect: true,
                  handleBack: handleUpdateAvatar,
                })
              }
            />
          </View>
        </View>
        <Text style={styles.name}> {userData.info.username} </Text>

        <View style={styles.buttonGroup}>
          {renderUserActionButtons()}
          <Icon
            type="feather"
            name="more-horizontal"
            size={16}
            containerStyle={styles.advanceIconContainer}
            onPress={() => {}}
          />
        </View>

        <View>
          <ListItem containerStyle={{ paddingVertical: 6 }}>
            <Icon
              type="antdesign"
              name="contacts"
              color="rgb(100,100,100)"
              size={24}
            />
            <ListItem.Content>
              <ListItem.Title>{`Contact: ${userData.info.phonenumber}`}</ListItem.Title>
            </ListItem.Content>
          </ListItem>

          <ListItem containerStyle={{ paddingVertical: 6 }}>
            <Icon
              type="font-awesome"
              name="birthday-cake"
              color="rgb(100,100,100)"
              size={24}
            />
            <ListItem.Content>
              <ListItem.Title>{`Birthday: ${
                userData.info.birthday ? getDate(userData.info.birthday) : ''
              }`}</ListItem.Title>
            </ListItem.Content>
          </ListItem>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                userId === user.id
                  ? stacks.friendTabs.name
                  : stacks.listFriend.name,
                {
                  userId,
                },
              )
            }
          >
            <ListItem containerStyle={{ paddingVertical: 6, marginBottom: 20 }}>
              <Icon
                type="font-awesome-5"
                name="user-friends"
                color="rgb(100,100,100)"
                size={20}
              />
              <ListItem.Content>
                <ListItem.Title>Friends</ListItem.Title>
                <ListItem.Subtitle>{`20 friends`}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color="black" />
            </ListItem>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (!userId || isFirstLoad) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <ActivityIndicator size="large" color="rgba(0,0,0,0.3)" />
      </View>
    );
  }

  return <PostList posts={userData.posts} header={ProfileHeader} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  cover: {
    width: DEVICE_WIDTH,
    height: 180,
    alignItems: 'flex-end',
  },
  profileOutterContainer: {
    backgroundColor: 'rgb(255,255,255)',
    alignItems: 'center',
    paddingBottom: 6,
    position: 'relative',
  },
  profileInnerContainer: {
    marginTop: -50,
  },

  name: {
    backgroundColor: 'rgb(255,255,255)',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },

  buttonGroup: {
    backgroundColor: 'rgb(255,255,255)',
    width: '100%',
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center',
  },
  addPostBtn: {
    backgroundColor: 'rgb(51, 133, 255)',
    borderRadius: 8,
    width: '50%',
    minWidth: 150,
    padding: 6,
    marginRight: 6,
  },
  updateProfileBtn: {
    backgroundColor: 'rgb(230, 230, 230)',
    borderRadius: 8,
    minWidth: 140,
    width: '50%',
    padding: 6,
  },
  addFriendBtn: {
    backgroundColor: 'rgb(51, 133, 255)',
    borderRadius: 8,
    width: '50%',
    minWidth: 150,
    padding: 6,
    marginRight: 6,
  },
  messageBtn: {
    backgroundColor: 'rgb(51, 133, 255)',
    borderRadius: 8,
    minWidth: 150,
    width: '50%',
    padding: 6,
  },
  advanceIconContainer: {
    backgroundColor: 'rgb(230, 230, 230)',
    borderRadius: 8,
    justifyContent: 'center',
    width: 40,
    marginLeft: 6,
  },
});

Profile.propTypes = {};

export default Profile;
