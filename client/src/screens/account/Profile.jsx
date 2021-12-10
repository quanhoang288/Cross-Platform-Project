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
import { useNavigation } from '@react-navigation/core';
import { PostList } from "../../components/post";
import { DEVICE_WIDTH } from "../../constants/dimensions";
import { auth, post } from "../../apis";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/core";
import { stacks } from "../../constants/title";

const Profile = (props) => {
  const user = useSelector(state => state.auth.user);
  const route = useRoute();
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const navigation = useNavigation();

  // console.log("first");

  const [isOwnProfile, setOwnProfile] = useState(true);

  const fetchUserData = async (userId) => {
    try {
      const infoResult = await auth.showInfo(userId, user.token);
      const postListResult = await post.getListPost(userId, user.token);

      setUserInfo(infoResult.data.data); 
      setPosts(postListResult.data.data);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (route.params && route.params.userId ){
      setOwnProfile(false);
    }
  }, [route]);

  useEffect(()=> {
    const usedId = isOwnProfile ? user.id : route.params.userId;
    fetchUserData(usedId);
  }, [isOwnProfile])

  const getDate = (value) => {
    let result = "";
    let date = new Date(value);
    result += `${ date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} `
    return result;
  }

  const ProfileHeader = () => {
    return (
      <>
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
                uri: "https://i.etsystatic.com/29282700/r/il/e3aae5/3152845862/il_340x270.3152845862_q44u.jpg",
              }}
              onPress={() => console.log("Pressed on avatar!")}
            />
          </View>
        </View>
        <Text style={styles.name}> {userInfo.username} </Text>

        <View style={styles.buttonGroupContainer}>
          <View style={styles.buttonGroup}>
            <Button
              buttonStyle={{
                backgroundColor: isOwnProfile ? "rgb(51, 133, 255)" : "rgb(230, 230, 230)",
                borderRadius: 8,
                width: "75%",
                minWidth: 150,
                padding: 6,
                marginHorizontal: 6
              }}
              
              title= {isOwnProfile ? "Add story" : 'Add friend'}
              icon={{
                type: isOwnProfile ? "antdesign" : "ionicons",
                name: isOwnProfile ? "pluscircle" : "person-add",
                color: isOwnProfile ? "rgb(255,255,255)" : "rgb(0,0,0)",
                size: 18,
              }}
              titleStyle={{
                fontWeight: '100',
                color: isOwnProfile ? "rgb(255,255,255)" : "rgb(0,0,0)",
              }}
            />

            <Button
              buttonStyle={{
                backgroundColor: isOwnProfile ? "rgb(230, 230, 230)" : "rgb(51, 133, 255)",
                borderRadius: 8,
                minWidth: 150,
                width: "75%",
                padding: 6,
                marginHorizontal: 6
              }}
              title={ isOwnProfile ? "Update Avatar " : 'Message'}
              icon={{
                type: isOwnProfile ? "material-community" : "fontisto",
                name: isOwnProfile ? "update" : "messenger",
                color: isOwnProfile ? "rgb(0,0,0)" : "rgb(255,255,255)",
                size: 18,
              }}
              titleStyle={{
                fontWeight: '100',
                color: isOwnProfile ? "rgb(0,0,0)" : "rgb(255,255,255)",
              }}
            />
            <Icon
              type='feather'
              name='more-horizontal'
              size={16}
              // style={{ marginHorizontal: 6, marginTop: 6, }}
              containerStyle={{
                backgroundColor: "rgb(230, 230, 230)", 
                borderRadius: 8, 
                justifyContent: "center", 
                width: 40,
                marginLeft: 6,
                // padding: 6,
              }}
              onPress={() => {}}
            />
          </View>
        </View>

        <View>
          <ListItem containerStyle={{paddingVertical: 6}}>
            <Icon type='antdesign' name='contacts' color="rgb(100,100,100)" size={24}/>
            <ListItem.Content>
              <ListItem.Title>{`Contact: ${userInfo.phonenumber}`}</ListItem.Title>
            </ListItem.Content>
          </ListItem>

          <ListItem containerStyle={{paddingVertical: 6}}>
            <Icon type='font-awesome' name='birthday-cake' color="rgb(100,100,100)" size={24}/>
            <ListItem.Content>
              <ListItem.Title>{`Birthday: ${userInfo.birthday ? getDate(userInfo.birthday) : ""}`}</ListItem.Title>
            </ListItem.Content>
          </ListItem>

          <TouchableOpacity 
            onPress={() => navigation.navigate( isOwnProfile ? stacks.friendTabs.name : stacks.listFriend.name, {
              userId: isOwnProfile ? userInfo.id : route.params.userId,
            })}
          >
            <ListItem containerStyle={{paddingVertical: 6, marginBottom: 20}}>
              <Icon type='font-awesome-5' name='user-friends' color="rgb(100,100,100)" size={20}/>
              <ListItem.Content>
                <ListItem.Title >Friends</ListItem.Title>
                <ListItem.Subtitle>{`20 friends`}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color='black' />
            </ListItem>
          </TouchableOpacity>
        </View>
      </>
    )
  }

  return (
      <PostList posts={posts} header={ProfileHeader}/>
  );
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
    backgroundColor:"rgb(255,255,255)",
    alignItems: "center",
    paddingBottom: 6,
    position: "relative",
  },
  profileInnerContainer: {
    // backgroundColor:"rgb(255,255,255)",
    marginTop: -50,
    // width: "fit-content"
  },

  name: {
    backgroundColor:"rgb(255,255,255)",
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
  buttonGroupContainer: {
    alignItems: "center",
    backgroundColor:"rgb(255,255,255)",
    paddingBottom: 10
  },
  buttonGroup: {
    width: "80%",
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center",
    // alignItems: 'center',
  },

});

Profile.propTypes = {};

export default Profile;
