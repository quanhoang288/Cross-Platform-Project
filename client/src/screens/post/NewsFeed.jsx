import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearProgress } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { message, post } from '../../apis';
import { Toast } from '../../helpers';
import { successMessages } from '../../constants/message';
import { useDispatch } from 'react-redux';
import { chatActions, uploadActions } from '../../redux/actions';
import { PostList } from '../../components/post';
import { useNavigation, useRoute } from '@react-navigation/core';
import { stacks } from '../../constants/title';
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../constants/dimensions';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../../configs';
import { authActions } from '../../redux/actions';

const NewsFeed = (props) => {
  const [progressVal, setProgressVal] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [isFetchingNextPage, setFetchingNextPage] = useState(false);

  const uploadStatus = useSelector((state) => state.upload);
  const user = useSelector((state) => state.auth.user);
  const socket = useSelector((state) => state.auth.socket);

  const dispatch = useDispatch();
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

  const fetchChats = async () => {
    try {
      const res = await message.getChats(user.token);
      const formattedChats = res.data.data.map((chat) => {
        const receiver = chat.member.find((u) => u._id !== user.id);

        return {
          id: chat._id,
          userName: receiver.username,
          userImg: receiver.avatar.fileName,
          numUnseenMessages: chat.numUnseenMessages,
          messageText: !chat.latestMessage.isDeleted
            ? chat.latestMessage.content
            : 'Message unsent',
          receivedId: receiver._id,
          latestMessageSentAt: chat.latestMessageSentAt,
        };
      });
      dispatch(chatActions.saveChats(formattedChats));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEndReached = () => {
    setFetchingNextPage(true);
  };

  const fetchNextPage = () => {
    console.log('Fetching next page...');
    const start = Date.now();
    post
      .getListPost(null, user.token, curPage + 1)
      .then((nextPage) => {
        const newPosts = nextPage.data.data;
        if (newPosts.length > 0) {
          setPosts(posts.concat(newPosts));
          setCurPage(curPage + 1);
        }
        setFetchingNextPage(false);
        console.log(`Finished in ${(Date.now() - start) / 1000}s`);
      })
      .catch((err) => console.log(err));
  };

  const refresh = async () => {
    await fetchPosts();
    setRefreshing(false);
    setCurPage(1);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage]);

  useEffect(() => {
    if (!user) {
      navigation.navigate(stacks.signIn.name);
    } else if (!socket) {
      const newSocket = io(SOCKET_URL);
      dispatch(authActions.setSocket(newSocket));
    } else {
      socket?.on('latestMessage', (data) => {
        const { senderId, receivedId } = data;
        if (user && (user.id == senderId || user.id == receivedId)) {
          dispatch(chatActions.updateChat(data));
        }
      });
      socket?.on('deleteChat', (data) => {
        const { chatId, deletedBy } = data;
        if (deletedBy == user.id) {
          dispatch(chatActions.removeChat(chatId));
        }
      });

      socket?.on('removeLatestMessage', (data) => {
        dispatch(chatActions.removeLatestMessage(data.chatId));
      });

      fetchChats();
    }

    return () => {};
  }, [user, socket]);

  useEffect(() => {
    if (uploadStatus.uploading) {
      setProgressVal(progressVal + 0.1);
    }
    if (uploadStatus.data) {
      setProgressVal(1);

      const postData = uploadStatus.data;
      if (posts.findIndex((post) => post._id === postData._id) !== -1) {
        Toast.showSuccessMessage(successMessages.updatePostSuccess);
        setPosts(
          posts.map((post) => (post._id === postData._id ? postData : post)),
        );
      } else {
        Toast.showSuccessMessage(successMessages.createPostSuccess);
        refresh();
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
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <Rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
      <Rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
      <Rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
      <Rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      <Rect
        x="0"
        y="88"
        rx="3"
        ry="3"
        width={DEVICE_WIDTH}
        height={DEVICE_WIDTH}
      />
      <Circle cx="20" cy="20" r="20" />
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
          color="white"
          trackColor="#2eb0fb"
        />
      )}
      <PostList
        refreshing={refreshing}
        handleRefresh={handleRefresh}
        posts={posts}
        handleEndReached={handleEndReached}
        isFetchingNextPage={isFetchingNextPage}
      />
    </View>
  );
};

export default NewsFeed;
