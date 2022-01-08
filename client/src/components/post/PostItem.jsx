import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button, Icon, Image, Text } from 'react-native-elements';
import { CarouselSwipe, CarouselTest } from '../common';
import { useNavigation } from '@react-navigation/native';
import { stacks } from '../../constants/title';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../redux/reducers/modalReducer';
import { types } from '../../constants/modalTypes';
import { like } from '../../apis';
import { uploadActions } from '../../redux/actions';
import { formatDate } from '../../helpers';
import { MoreOrLessText } from '../common';
import { ASSET_API_URL } from '../../configs';

const areEqual = (prevProps, nextProps) => {
  const { post, postList } = nextProps;
  const { post: prevPost, postList: prevPostList } = prevProps;

  if (post !== prevPost) {
    return false;
  }

  const selectedIndex = postList.findIndex((item) => item._id === post._id);
  const prevSelectedIndex = prevPostList.findIndex(
    (item) => item._id === prevPost._id,
  );

  return selectedIndex === prevSelectedIndex;
};

const PostItem = ({ post, postList }) => {
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLike, setLike] = useState(post.isLike);
  const [numLikes, setNumLikes] = useState(post.like.length);

  useEffect(() => {
    if (!user) {
      navigation.navigate(stacks.signIn.name);
    }
  }, [user]);

  // API like
  const actionLike = () => {
    setNumLikes(isLike ? numLikes - 1 : numLikes + 1);
    setLike(!isLike);

    like
      .actionLike(post._id, user.token)
      .then((result) => {
        const curLikes = result.data.data.like; //numLikes
        const curIsLike = result.data.data.isLike;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileSection}>
          <Avatar
            rounded
            source={{
              uri: `${ASSET_API_URL}/${post.author.avatar?.fileName}`,
            }}
            onPress={() =>
              navigation.navigate(stacks.profile.name, {
                userId: post.author._id,
              })
            }
          />
          <View style={styles.nameTimeLine}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(stacks.profile.name, {
                  userId: post.author._id,
                })
              }
            >
              <Text style={{ fontWeight: 'bold' }}>{post.author.username}</Text>
            </TouchableOpacity>
            <Text>{formatDate(post.createdAt)}</Text>
          </View>
        </View>
        <Icon
          type="feather"
          name="more-horizontal"
          size={32}
          iconStyle={{ marginRight: 6 }}
          style={{ marginRight: 6 }}
          onPress={() => {
            dispatch(uploadActions.resetState());
            dispatch(
              showModal({
                modalType: types.postAdvance,
                propsData: {
                  postId: post._id,
                  authorId: post.author._id,
                },
              }),
            );
          }}
        />
      </View>

      <View style={styles.postContent}>
        <MoreOrLessText
          content={post.described}
          textStyle={styles.textContent}
        />
        <CarouselSwipe images={post.images} />
      </View>

      <View style={styles.iconGroup}>
        <View style={styles.icon}>
          <Icon
            type="font-awesome"
            name={isLike ? 'heart' : 'heart-o'}
            size={28}
            onPress={actionLike}
            color={isLike ? 'rgb(255, 0, 0)' : 'rgb(0, 0, 0)'}
          />
          <Text style={styles.count}>{numLikes}</Text>
        </View>
        <View style={styles.icon}>
          <Icon
            type="font-awesome"
            name="comment-o"
            size={28}
            onPress={() =>
              navigation.navigate(stacks.comment.name, {
                postId: post._id,
              })
            }
          />
          <Text style={styles.count}>{post.countComments}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    marginLeft: 6,
    marginBottom: 10,
    paddingTop: 6,
    alignItems: 'flex-start',
  },
  profileSection: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameTimeLine: {
    marginLeft: 6,
  },
  postContent: {
    flex: 1,
    // marginBottom: 4,
  },
  textContent: {
    marginHorizontal: 6,
    marginBottom: 10,
  },
  iconGroup: {
    marginLeft: 6,
    flexDirection: 'row',
    marginBottom: 10,
  },
  icon: {
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  count: {
    marginLeft: 4,
  },
});

export default React.memo(PostItem, areEqual);
