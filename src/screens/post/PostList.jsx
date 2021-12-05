import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import { PostItem } from "../../components/post";
import { Divider, Icon, ListItem, LinearProgress } from "react-native-elements";
import { useSelector } from "react-redux";
import { post } from "../../apis";

const PostList = (props) => {
  const user = useSelector((state) => state.auth.user);

  // API getPosts
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    post
      .getListPost(null, user.token)
      .then((result) => {
        // console.log(result.data);
        const curPosts = result.data.data;
        setPosts(curPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // API like
  const actionLike = (postId) => {
    like
      .actionLike(postId, user.token)
      .then((result) => {
        const curLikes = result.data.data.like; //numLikes
        const curIsLike = result.data.data.isLike;
        setPosts(
          posts.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                like: curLikes,
                isLike: curIsLike,
              };
            }
            return post;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PostItem key={item._id} post={item} actionLike={actionLike} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

PostList.propTypes = {};

export default PostList;
