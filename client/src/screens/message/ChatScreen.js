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
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { stacks } from '../../constants/title';
const ChatScreen = () => {
  // const socket = useRef();
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const { receivedId } = route.params;
  const user = useSelector((state) => state.auth.user);
  const senderId = user.id;
  const token = user.token;
  const navigation = useNavigation();
  const [chatId, setChatId] = useState(null);
  const [isLoadingEarlier, setLoadingEarlier] = useState(false);

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
      }

      // socket.current = io(SOCKET_URL);
    };
    initialize();
  }, []);

  useEffect(() => {
    navigation.setOptions({
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
  }, [navigation]);

  useEffect(() => {
    socket?.on('getMessage', (data) => {
      // console.log('new mess: ', data);
      // console.log('current user: ', senderId);
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
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages),
      );
      try {
        const sendResult = await message.sendMessage(
          receivedId,
          newMsgObj.text,
          token,
        );
        const newMsg = sendResult.data.data;
        socket?.emit('sendMessage', {
          chatId: newMsg.chat._id,
          _id: newMsg._id,
          senderId: senderId,
          receivedId: receivedId,
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
