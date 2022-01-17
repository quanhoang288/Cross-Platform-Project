import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
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
  LinearProgress,
  Text,
} from 'react-native-elements';
import { PostList } from '../../components/post';
import { DEVICE_WIDTH } from '../../constants/dimensions';
import { auth, friend, post } from '../../apis';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/core';
import { stacks } from '../../constants/title';
import { ASSET_API_URL } from '../../configs';
import FRIEND_STATUS from '../../constants/friendStatus';
import { Toast } from '../../helpers';
import { hideModal, showModal } from '../../redux/reducers/modalReducer';
import { types } from '../../constants/modalTypes';
import convertToBase64 from '../../helpers/Base64Convert';
import { LogBox } from 'react-native';
import { mediaActions } from '../../redux/actions';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Profile = (props) => {
  const [userData, setUserData] = useState({ info: {}, posts: [] });
  const [userId, setUserId] = useState(null);
  const [isFirstLoad, setFirstLoad] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [friendStatus, setFriendStatus] = useState(FRIEND_STATUS.NON_FRIEND);
  const [profileImgUris, setProfileImgUris] = useState({
    avatar: null,
    coverImage: null,
  });
  const [updateType, setUpdateType] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const selectedAssets = useSelector((state) => state.media.selectedAssets);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

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
      dispatch(hideModal());
      Toast.showFailureMessage('Error unfriending this person');
    }
  };

  const handleUpdateFriendStatus = (isAccept) => {
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

  const getFriendBtnTitleByStatus = (friendStatus) => {
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

  const handleFriendBtnPress = (friendStatus) => {
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
    console.log('friend status: ', friendStatus);
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

  const handleUpdateProfileImg = async (type, selectedAssets) => {
    const base64Assets = await convertToBase64(selectedAssets);
    const imageToUpload = base64Assets[0];

    let updateData = {
      [type]: imageToUpload,
    };

    try {
      const editRes = await auth.editInfo(updateData, user.token);
      const userInfo = editRes.data.data;

      setUserData({
        info: {
          ...userData.info,
          avatar: userInfo.avatar,
          cover_image: userInfo.cover_image,
        },
        posts: userData.posts.map((post) => ({
          ...post,
          author: {
            ...post.author,
            avatar: userInfo.avatar,
          },
        })),
      });
      dispatch(mediaActions.resetState());
      const successMsg =
        type == 'avatar'
          ? 'Update avatar succesfully'
          : 'Update cover image successfully';
      Toast.showSuccessMessage(successMsg);
      setUpdateType(null);
    } catch (error) {
      console.log(error);
      const errMsg =
        type == 'avatar'
          ? 'Error updating avatar'
          : 'Error updating cover image';
      Toast.showFailureMessage(errMsg);
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
    const initializeUserProfile = async (userId) => {
      const info = await fetchUserInfo(userId);
      const posts = await fetchUserPosts(userId);
      setUserData({ info, posts });
    };
    if (userId) {
      initializeUserProfile(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (
      route.name === stacks.profile.name &&
      updateType &&
      selectedAssets.length > 0
    ) {
      handleUpdateProfileImg(updateType, selectedAssets);
    }
  }, [selectedAssets, updateType, route]);

  const handleRefresh = async (userId) => {
    await initializeUserProfile(userId);
    setRefreshing(false);
  };

  const handleLoadMore = useCallback(async () => {
    try {
      const offset = userData.posts.length;
      const nextPostList = await post.getListPostByOffset(
        userId,
        user.token,
        offset,
      );
      const newPosts = nextPostList.data.data;
      if (newPosts.length > 0) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          posts: prevUserData.posts.concat(newPosts),
        }));
      }
      setLoadingMore(false);
    } catch (err) {
      console.log(err);
    }
  }, [userData, userId]);

  useEffect(() => {
    if (refreshing && userId) {
      handleRefresh(userId);
    }
  }, [refreshing, userId]);

  useEffect(() => {
    if (isLoadingMore) {
      handleLoadMore();
    }
  }, [isLoadingMore]);

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
            imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(stacks.mediaPicker.name, {
                  isSingleSelect: true,
                  headerRightTitle: 'Save',
                  callback: () => setUpdateType('cover_image'),
                })
              }
            >
              {userId === user.id && (
                <Icon
                  name="camera"
                  type="entypo"
                  size={36}
                  iconStyle={{
                    backgroundColor: 'rgb(230, 230, 230)',
                    padding: 8,
                    borderRadius: 24,
                  }}
                  style={{
                    backgroundColor: 'rgb(230, 230, 230)',
                  }}
                />
              )}
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.profileOutterContainer}>
          <View style={styles.profileInnerContainer}>
            <Avatar
              rounded
              size={150}
              source={{
                uri: profileImgUris.avatar,
              }}
              onPress={() => console.log('Pressed on avatar!')}
            />
            {userId === user.id && (
              <Avatar.Accessory
                name="camera"
                type="entypo"
                size={42}
                iconProps={{
                  size: 28,
                  color: 'black',
                }}
                style={{
                  backgroundColor: 'rgb(230, 230, 230)',
                }}
                onPress={() =>
                  navigation.navigate(stacks.mediaPicker.name, {
                    isSingleSelect: true,
                    headerRightTitle: 'Save',
                    callback: () => setUpdateType('avatar'),
                  })
                }
              />
            )}
          </View>
        </View>
        <Text style={styles.name}> {userData.info.username} </Text>

        <View style={styles.buttonGroup}>
          {userId === user.id ? (
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
                onPress={() =>
                  navigation.navigate(stacks.personalInformation.name)
                }
              />
            </>
          ) : (
            <>
              <Button
                buttonStyle={styles.addFriendBtn}
                title={getFriendBtnTitleByStatus(friendStatus)}
                icon={{
                  type: getIconByFriendStatus(friendStatus).type,
                  name: getIconByFriendStatus(friendStatus).name,
                  color: 'rgb(255,255,255)',
                  size: 18,
                }}
                titleStyle={{
                  fontWeight: '100',
                  color: 'rgb(255,255,255)',
                }}
                onPress={() => handleFriendBtnPress(friendStatus)}
              />

              <Button
                buttonStyle={styles.messageBtn}
                onPress={() =>
                  navigation.navigate(stacks.chatScreen.name, {
                    receiver: {
                      _id: userId,
                      username: userData.info.username,
                      avatar: userData.info.avatar
                        ? userData.info.avatar.fileName
                        : null,
                    },
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
          )}
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
                {/* <ListItem.Subtitle>{`20 friends`}</ListItem.Subtitle> */}
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

  return (
    <View>
      {updateType && <LinearProgress color="white" trackColor="#2eb0fb" />}
      <PostList
        handleRefresh={() => setRefreshing(true)}
        handleEndReached={() => setLoadingMore(true)}
        isFetchingNextPage={isLoadingMore}
        refreshing={refreshing}
        posts={userData.posts}
        header={ProfileHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  cover: {
    marginTop: 20,
    paddingTop: 5,
    paddingRight: 5,
    marginHorizontal: 10,
    width: DEVICE_WIDTH - 20,
    height: 240,
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
