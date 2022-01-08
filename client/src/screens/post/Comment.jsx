import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, StyleSheet, Keyboard, FlatList } from 'react-native';
import { Divider, Icon, Input } from 'react-native-elements';
import { CommentItem } from '../../components/post';
import { DEVICE_WIDTH } from '../../constants/dimensions';
import { comment } from '../../apis';
import { useRoute } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import { LazyFlatList } from '../../components/common';
import { Toast } from '../../helpers';

const Comment = (props) => {
  // user
  const user = useSelector((state) => state.auth.user);

  const [comments, setComments] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [inputComment, setInputComment] = useState('');
  const route = useRoute();
  const postId = route.params.postId;

  const fetchComments = async () => {
    try {
      const commentListRes = await comment.getListComment(postId, user.token);
      setComments(commentListRes.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async (postId, content) => {
    try {
      const addResult = await comment.addComment(postId, content, user.token);
      const newComment = addResult.data.data;
      setComments([newComment, ...comments]);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status == 410) {
        Toast.showFailureMessage('This post has been deleted');
      }
    }
  };

  const handleLoadMore = async () => {
    try {
      const offset = comments.length;
      const start = Date.now();
      const newCommentList = await comment.getListComment(
        postId,
        user.token,
        offset,
      );
      const newComments = newCommentList.data.data;
      if (newComments.length > 0) {
        setComments(comments.concat(newComments));
      }
      setLoadingMore(false);
      console.log(`Finished in ${(Date.now() - start) / 1000}s`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRefresh = async () => {
    await fetchComments();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <CommentItem comment={item} commentList={comments} />
  );

  useEffect(() => {
    fetchComments();
  }, [route]);

  useEffect(() => {
    if (isRefreshing) {
      handleRefresh();
    }
    if (isLoadingMore) {
      handleLoadMore();
    }
  }, [isRefreshing, isLoadingMore]);

  return (
    <View style={styles.container}>
      <LazyFlatList
        data={comments}
        renderItem={renderItem}
        refreshing={isRefreshing}
        isFetchingNextPage={isLoadingMore}
        handleRefresh={() => setRefreshing(true)}
        handleEndReached={() => setLoadingMore(true)}
        listStyle={styles.commentList}
      />

      <View style={styles.commentSection}>
        <Icon
          type="feather"
          name="camera"
          size={28}
          containerStyle={{ alignSelf: 'center' }}
          iconStyle={styles.cameraIcon}
        />
        <Input
          placeholder="Enter your comment"
          multiline
          inputContainerStyle={styles.commentInputContainer}
          numberOfLines={3}
          value={inputComment}
          onChangeText={(text) => setInputComment(text)}
          rightIcon={
            inputComment.length > 0 ? (
              <Icon
                name="send"
                type="ionicons"
                size={28}
                iconStyle={{ color: 'blue', marginLeft: 6 }}
                onPress={() => {
                  setInputComment('');
                  Keyboard.dismiss();
                  handleAddComment(postId, inputComment);
                }}
              />
            ) : null
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentList: {
    marginBottom: 6,
  },
  commentSection: {
    marginBottom: 6,
    maxHeight: 50,
    flexDirection: 'row',
  },
  commentInputContainer: {
    borderRadius: 20,
    borderColor: 'rgba(110, 120, 170, 1)',
    borderWidth: 1,
    width: '90%',
    paddingLeft: 10,
  },
  cameraIcon: {
    marginLeft: 6,
    alignSelf: 'center',
  },
});

Comment.propTypes = {};

export default Comment;
