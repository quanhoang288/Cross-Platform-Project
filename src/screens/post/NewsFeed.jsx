import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { LinearProgress } from "react-native-elements";
import { useSelector } from "react-redux";
import { post } from "../../apis";
import { Toast } from "../../helpers";
import { successMessages } from "../../constants/message";
import { useDispatch } from "react-redux";
import { uploadActions } from "../../redux/actions";
import { PostList } from "../../components/post";
import { useNavigation, useRoute } from "@react-navigation/core";
import { stacks } from "../../constants/title";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/dimensions";

const NewsFeed = (props) => {
  const [progressVal, setProgressVal] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const uploadStatus = useSelector((state) => {
    console.log("upload status");
    return state.upload;
  });
  const user = useSelector((state) => state.auth.user);

  const navigation = useNavigation();

  // API getPosts
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const latestPosts = await post.getListPost(null, user.token);
      setPosts(latestPosts.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("fetching posts");
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!user) {
      navigation.navigate(stacks.signIn.name);
    }
  }, [user]);

  useEffect(() => {
    if (uploadStatus.uploading) {
      setProgressVal(progressVal + 0.1);
    }
    if (uploadStatus.data) {
      setProgressVal(1);

      const postData = uploadStatus.data;
      if (posts.findIndex((post) => post._id === postData._id) !== -1) {
        Toast.showSucessMessage(successMessages.updatePostSuccess);
        setPosts(
          posts.map((post) => (post._id === postData._id ? postData : post))
        );
      } else {
        Toast.showSucessMessage(successMessages.createPostSuccess);
        setPosts([postData, ...posts]);
        dispatch(uploadActions.resetState());
      }

      dispatch(uploadActions.resetState());
    } else if (uploadStatus.err) {
      Toast.showFailureMessage(uploadStatus.err);
    }
  }, [uploadStatus]);

  useEffect(() => {
    if (progressVal > 0 && progressVal < 1) {
      setTimeout(() => {
        setProgressVal((prev) => Math.max(prev + 0.1, 0.9));
      }, 1000);
    }
  }, [progressVal]);

  useEffect(() => {
    const refresh = async () => {
      await fetchPosts();
      setRefreshing(false);
    };
    if (refreshing) {
      refresh();
    }
  }, [refreshing]);

  const MyLoader = (props) => (
    <ContentLoader
      speed={5}
      width={DEVICE_WIDTH}
      height={DEVICE_HEIGHT}
      viewBox={`0 0 ${DEVICE_WIDTH} ${DEVICE_HEIGHT}`}
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
      {...props}
    >
      <Rect x='48' y='8' rx='3' ry='3' width='88' height='6' />
      <Rect x='48' y='26' rx='3' ry='3' width='52' height='6' />
      <Rect x='0' y='56' rx='3' ry='3' width='410' height='6' />
      <Rect x='0' y='72' rx='3' ry='3' width='380' height='6' />
      <Rect
        x='0'
        y='88'
        rx='3'
        ry='3'
        width={DEVICE_WIDTH}
        height={DEVICE_WIDTH}
      />
      <Circle cx='20' cy='20' r='20' />
    </ContentLoader>
  );

  const handleRefresh = () => {
    setRefreshing(true);
  };

  if (posts.length === 0) {
    return <MyLoader />;
  }

  return (
    <View>
      {uploadStatus.uploading && (
        <LinearProgress
          value={progressVal}
          color='white'
          trackColor='#2eb0fb'
        />
      )}
      <PostList
        refreshing={refreshing}
        handleRefresh={handleRefresh}
        posts={posts}
      />
    </View>
  );
};

NewsFeed.propTypes = {};

export default NewsFeed;
