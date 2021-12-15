import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Avatar, Icon, Text } from 'react-native-elements';
import { MoreOrLessText } from '../common';
import { formatDate } from '../../helpers';

const areEqual = (prevProps, nextProps) => {
  const { comment, commentList } = nextProps;
  const { comment: prevComment, commentList: prevCommentList } = prevProps;

  if (comment !== prevComment) {
    return false;
  }

  const selectedIndex = commentList.findIndex(
    (item) => item._id === comment._id,
  );
  const prevSelectedIndex = prevCommentList.findIndex(
    (item) => item._id === prevComment._id,
  );

  return selectedIndex === prevSelectedIndex;
};

const CommentItem = ({ comment, commentList }) => {
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        source={{
          uri: 'https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg',
        }}
      />
      <View style={styles.commentContainer}>
        <Text style={{ fontWeight: 'bold' }}>{comment.user.username}</Text>
        <MoreOrLessText content={comment.content} />
        <Text>{formatDate(comment.createdAt)}</Text>
      </View>
      <Icon
        type="font-awesome"
        name="heart-o"
        size={28}
        iconStyle={{ marginRight: 6 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6,
    marginBottom: 10,
    marginHorizontal: 6,
    backgroundColor: '#fff',
  },
  commentContainer: {
    flex: 2,
    borderRadius: 10,
    marginHorizontal: 6,
  },
});

export default React.memo(CommentItem, areEqual);
