import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  Avatar,
  Button,
  Divider,
  Icon,
  Image,
  ListItem,
  Text,
} from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import { PostList } from "../../components/post";
import { DEVICE_WIDTH } from "../../constants/dimensions";
import { auth, post } from "../../apis";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/core";
import { stacks } from "../../constants/title";
import { ASSET_API_URL } from "../../configs";

const Profile = (props) => {
  const user = useSelector((state) => state.auth.user);
  const route = useRoute();
  const [userData, setUserData] = useState({ info: {}, posts: [] });
  // console.log(userData.info.avatar);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

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
      console.log("user info: ", info);
      const posts = await fetchUserPosts(userId);
      setUserData({ info, posts });
    };
    if (userId) {
      initializeUserProfile(userId);
    }
  }, [userId]);

  const getDate = (value) => {
    let result = "";
    let date = new Date(value);
    result += `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `;
    return result;
  };

  const renderUserActionButtons = () => {
    if (!userId) {
      return null;
    }

    if (userId === user.id) {
      return (
        <>
          <Button
            buttonStyle={styles.addPostBtn}
            title='Add post'
            icon={{
              type: "antdesign",
              name: "pluscircle",
              color: "rgb(255,255,255)",
              size: 18,
            }}
            titleStyle={{
              color: "rgb(255,255,255)",
            }}
          />

          <Button
            buttonStyle={styles.updateProfileBtn}
            title='Update Avatar'
            icon={{
              type: "material-community",
              name: "update",
              color: "rgb(0,0,0)",
              size: 18,
            }}
            titleStyle={{
              color: "rgb(0,0,0)",
            }}
          />
        </>
      );
    }
    return (
      <>
        <Button
          buttonStyle={styles.addFriendBtn}
          title='Add friend'
          icon={{
            type: "ionicons",
            name: "person-add",
            color: "rgb(255,255,255)",
            size: 18,
          }}
          titleStyle={{
            fontWeight: "100",
            color: "rgb(255,255,255)",
          }}
        />

        <Button
          buttonStyle={styles.messageBtn}
          title='Message'
          icon={{
            type: "fontisto",
            name: "messenger",
            color: "rgb(255,255,255)",
            size: 18,
          }}
          titleStyle={{
            fontWeight: "100",
            color: "rgb(255,255,255)",
          }}
        />
      </>
    );
  };

  const ProfileHeader = () => {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://mondaycareer.com/wp-content/uploads/2020/11/background-%C4%91%E1%BA%B9p-2-1024x585.jpg",
          }}
          alt='This is cover image'
          style={styles.cover}
        />
        <View style={styles.profileOutterContainer}>
          <View style={styles.profileInnerContainer}>
            <Avatar
              rounded
              size={88}
              source={{
                // uri: `${ASSET_API_URL}/${userData.info.avatar.fileName}`,
                uri: "https://i.etsystatic.com/29282700/r/il/e3aae5/3152845862/il_340x270.3152845862_q44u.jpg",
              }}
              onPress={() => console.log("Pressed on avatar!")}
            />
          </View>
        </View>
        <Text style={styles.name}> {userData.info.username} </Text>

        <View style={styles.buttonGroup}>
          {renderUserActionButtons()}
          <Icon
            type='feather'
            name='more-horizontal'
            size={16}
            containerStyle={styles.advanceIconContainer}
            onPress={() => {}}
          />
        </View>

        <View>
          <ListItem containerStyle={{ paddingVertical: 6 }}>
            <Icon
              type='antdesign'
              name='contacts'
              color='rgb(100,100,100)'
              size={24}
            />
            <ListItem.Content>
              <ListItem.Title>{`Contact: ${userData.info.phonenumber}`}</ListItem.Title>
            </ListItem.Content>
          </ListItem>

          <ListItem containerStyle={{ paddingVertical: 6 }}>
            <Icon
              type='font-awesome'
              name='birthday-cake'
              color='rgb(100,100,100)'
              size={24}
            />
            <ListItem.Content>
              <ListItem.Title>{`Birthday: ${
                userData.info.birthday ? getDate(userData.info.birthday) : ""
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
                }
              )
            }
          >
            <ListItem containerStyle={{ paddingVertical: 6, marginBottom: 20 }}>
              <Icon
                type='font-awesome-5'
                name='user-friends'
                color='rgb(100,100,100)'
                size={20}
              />
              <ListItem.Content>
                <ListItem.Title>Friends</ListItem.Title>
                <ListItem.Subtitle>{`20 friends`}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color='black' />
            </ListItem>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return <PostList posts={userData.posts} header={ProfileHeader} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  cover: {
    width: DEVICE_WIDTH,
    height: 180,
    alignItems: "flex-end",
  },
  profileOutterContainer: {
    backgroundColor: "rgb(255,255,255)",
    alignItems: "center",
    paddingBottom: 6,
    position: "relative",
  },
  profileInnerContainer: {
    marginTop: -50,
  },

  name: {
    backgroundColor: "rgb(255,255,255)",
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
  },

  buttonGroup: {
    backgroundColor: "rgb(255,255,255)",
    width: "100%",
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
  },
  addPostBtn: {
    backgroundColor: "rgb(51, 133, 255)",
    borderRadius: 8,
    width: "50%",
    minWidth: 120,
    padding: 6,
    marginRight: 6,
  },
  updateProfileBtn: {
    backgroundColor: "rgb(230, 230, 230)",
    borderRadius: 8,
    minWidth: 150,
    width: "50%",
    padding: 6,
  },
  addFriendBtn: {
    backgroundColor: "rgb(51, 133, 255)",
    borderRadius: 8,
    width: "50%",
    minWidth: 150,
    padding: 6,
    marginRight: 6,
  },
  messageBtn: {
    backgroundColor: "rgb(51, 133, 255)",
    borderRadius: 8,
    minWidth: 150,
    width: "50%",
    padding: 6,
  },
  advanceIconContainer: {
    backgroundColor: "rgb(230, 230, 230)",
    borderRadius: 8,
    justifyContent: "center",
    width: 40,
    marginLeft: 6,
  },
});

Profile.propTypes = {};

export default Profile;
