import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, Clipboard, Keyboard } from 'react-native';
import {
  Bubble,
  GiftedChat,
  Send,
  InputToolbar,
} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { io } from 'socket.io-client';
import { message } from '../../apis';
import { SOCKET_URL } from '../../configs';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { stacks } from '../../constants/title';
import { chatActions } from '../../redux/actions';
const ChatScreen = () => {
  // const socket = useRef();
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const { receivedId, receiverName, receiverImg } = route.params;
  const user = useSelector((state) => state.auth.user);
  const senderId = user.id;
  const token = user.token;
  const navigation = useNavigation();
  const [chatId, setChatId] = useState(null);
  const [isLoadingEarlier, setLoadingEarlier] = useState(false);

  const dispatch = useDispatch();
  const socket = useSelector((state) => state.auth.socket);

  const fetchMessages = async () => {
    try {
      const res = await message.getMessageByOtherUserId(receivedId, token);
      return res.data.data;
    } catch (err) {
      if (err.response.status == 404) {
        return null;
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: receiverName,
      headerRight: () => (
        <Icon
          type="feather"
          name="more-horizontal"
          size={32}
          style={{ marginRight: 10 }}
          onPress={() =>
            navigation.navigate(stacks.chatSetting.name, {
              chatId: chatId,
            })
          }
        />
      ),
    });
  }, [route, navigation]);

  useEffect(() => {
    const initialize = async () => {
      const newMessages = await fetchMessages();
      if (newMessages && newMessages.length > 0) {
        setMessages(
          newMessages.map((msg) => ({
            ...msg,
            _id: msg._id,
            text: msg.content,
            createdAt: msg.createdAt,
            user: {
              _id: msg.user._id,
              name: msg.user.username,
            },
          })),
        );
        setChatId(newMessages[0].chat);
        dispatch(chatActions.updateSeenStatus(newMessages[0].chat));
      }
    };
    initialize();
    return () => {};
  }, []);

  useEffect(() => {
    socket?.on('getMessage', (data) => {
      if (senderId === data.receivedId) {
        const newMsg = {
          _id: data._id,
          text: data.content,
          createdAt: data.createdAt,
          user: {
            _id: data.senderId,
          },
        };

        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [newMsg]),
        );
      }
    });
    socket?.on('removeMess', (data) => {
      if (receivedId === data.userId) {
        setMessages((previousMessages) =>
          previousMessages.filter((messages) => messages._id !== data._id),
        );
      }
    });
  }, [socket]);

  useEffect(() => {
    if (isLoadingEarlier) {
      handleLoadEarlier();
    }
  }, [isLoadingEarlier]);

  useEffect(() => {
    if (!user) {
      navigation.navigate(stacks.signIn.name);
    }
  }, [user]);

  const handleLoadEarlier = async () => {
    try {
      const earlierMessages = await message.getMessageByOtherUserId(
        receivedId,
        token,
        messages.length,
      );
      const formattedEarlierMessages = earlierMessages.data.data.map((msg) => ({
        ...msg,
        _id: msg._id,
        text: msg.content,
        createdAt: msg.createdAt,
        user: {
          _id: msg.user._id,
          name: msg.user.username,
        },
      }));
      setMessages(messages.concat(formattedEarlierMessages));
      setLoadingEarlier(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSend = useCallback(async (messages = []) => {
    if (messages.length > 0) {
      const newMsgObj = messages[0];
      Keyboard.dismiss();

      try {
        const sendResult = await message.sendMessage(
          receivedId,
          newMsgObj.text,
          token,
        );
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, messages),
        );

        const newMsg = sendResult.data.data;
        dispatch(chatActions.updateSeenStatus(newMsg.chat._id));

        socket?.emit('sendMessage', {
          chatId: newMsg.chat._id,
          _id: newMsg._id,
          senderId: senderId,
          receivedId: receivedId,
          userName: receiverName,
          userImg: receiverImg,
          content: newMsgObj.text,
          createdAt: newMsg.createdAt,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ paddingBottom: -20, marginRight: 2 }}
            size={40}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  const onDelete = async (messageIdToDelete) => {
    setMessages((previousMessages) =>
      previousMessages.filter((messages) => messages._id !== messageIdToDelete),
    );
    const deleteMess = await message.deleteMessage(
      chatId,
      messageIdToDelete,
      token,
    );
    console.log(deleteMess.data.data);
    const messDelete = deleteMess.data.data;
    socket?.emit('deleteMessage', {
      _id: messDelete._id,
      userId: messDelete.user,
    });
  };

  const onLongPress = (context, message) => {
    const options = ['Copy', 'Delete Message', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Clipboard.setString(message.text);
            break;
          case 1:
            console.log('delete');
            onDelete(message._id);
            break;
        }
      },
    );
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: senderId,
        name: user.username,
      }}
      onLongPress={onLongPress}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      isLoadingEarlier={isLoadingEarlier}
      loadEarlier
      onLoadEarlier={() => setLoadingEarlier(true)}
    />
  );
};

export default ChatScreen;
