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
  const [userId, setUserId] = useState(route.params.userId);
  const [userInfo, setUserInfo] = useState({});
  const navigation = useNavigation();

  // useEffect(() => {
  //   if (route.params && route.params.userId) {
  //     setUserId(route.params.userId);
  //   }
  // }, [route]);

  useEffect(() => {
    auth.showInfo(userId, user.token)
    .then(result => {
      setUserInfo(result.data.data);
    })
    .catch(error => console.log(error))
  }, [userId])

  useEffect(() => {
    post
      .getListPost(userId, user.token)
      .then((result) => {
        // console.log(result.data);
        setPosts(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return (
    <ScrollView>
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
            size={100}
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
              backgroundColor: user.id === userId ? "rgb(51, 133, 255)" : "rgb(230, 230, 230)",
              borderRadius: 10,
              width: "75%",
              minWidth: 150,
              marginHorizontal: 6
            }}
            
            title= {user.id === userId ? "Add story" : 'Add friend'}
            icon={{
              type: user.id === userId ? "antdesign" : "ionicons",
              name: user.id === userId ? "pluscircle" : "person-add",
              color: user.id === userId ? "rgb(255,255,255)" : "rgb(0,0,0)",
              size: 18,
            }}
            titleStyle={{
              fontWeight: '200',
              color: user.id === userId ? "rgb(255,255,255)" : "rgb(0,0,0)",
            }}
          />

          <Button
            buttonStyle={{
              backgroundColor: user.id === userId ? "rgb(230, 230, 230)" : "rgb(51, 133, 255)",
              borderRadius: 10,
              minWidth: 150,
              width: "75%",
              marginHorizontal: 6
            }}
            title={ user.id === userId ? "Update Avatar " : 'Message'}
            icon={{
              type: user.id === userId ? "material-community" : "fontisto",
              name: user.id === userId ? "update" : "messenger",
              color: user.id === userId ? "rgb(0,0,0)" : "rgb(255,255,255)",
              size: 18,
            }}
            titleStyle={{
              fontWeight: '200',
              color: user.id === userId ? "rgb(0,0,0)" : "rgb(255,255,255)",
            }}
          />
          <Icon
            type='feather'
            name='more-horizontal'
            size={32}
            style={{ marginHorizontal: 6, marginTop: 6 }}
            onPress={() => {}}
          />
        </View>
      </View>

      <View>
        <ListItem containerStyle={{paddingVertical: 4}}>
          <Icon type='antdesign' name='contacts' color="rgb(100,100,100)" size={26}/>
          <ListItem.Content>
            <ListItem.Title>{`Contact: ${userInfo.phonenumber}`}</ListItem.Title>
          </ListItem.Content>
        </ListItem>

        {userId === user.id &&
          <TouchableOpacity 
            onPress={() => navigation.navigate(stacks.friendTabs.name, {
              userId: userId,
            })}
          >
            <ListItem containerStyle={{paddingVertical: 4}}>
              <Icon type='font-awesome-5' name='user-friends' color="rgb(100,100,100)" size={24}/>
              <ListItem.Content>
                <ListItem.Title >Friends</ListItem.Title>
                <ListItem.Subtitle>{`20 friends`}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color='black' />
            </ListItem>
          </TouchableOpacity>
        }
      </View>

      <PostList posts={posts} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  cover: {
    width: DEVICE_WIDTH,
    height: 256,
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
