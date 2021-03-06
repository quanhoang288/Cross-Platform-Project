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
import { message, auth } from '../../apis';
import { ASSET_API_URL, SOCKET_URL } from '../../configs';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, ListItem, Button, Text } from 'react-native-elements';
import { stacks } from '../../constants/title';
import { chatActions } from '../../redux/actions';
import { Toast } from '../../helpers';
import { HeaderBackButton } from '@react-navigation/elements';

const ChatScreen = () => {
  // const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [isLoadingEarlier, setLoadingEarlier] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [receiver, setReceiver] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const socket = useSelector((state) => state.auth.socket);

  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  const fetchMessages = useCallback(async () => {
    try {
      const res = await message.getMessageByOtherUserId(
        receiver._id,
        user.token,
      );
      return res.data;
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status == 404) {
        return null;
      }
    }
  }, [receiver, user]);

  const handleBack = () => {
    dispatch(chatActions.updateCurrentChatRoom(null));
    navigation.navigate('MessageStack');
  };

  const handleLoadEarlier = useCallback(async () => {
    try {
      const earlierMessages = await message.getMessageByOtherUserId(
        receiver._id,
        user.token,
        messages.length,
      );
      const formattedEarlierMessages = earlierMessages.data.data.map((msg) => ({
        ...msg,
        _id: msg._id,
        text: !msg.isDeleted ? msg.content : 'Message unsent',
        createdAt: msg.createdAt,
        user: {
          _id: msg.user._id,
          name: msg.user.username,
        },
      }));
      setMessages((prevMessages) =>
        prevMessages.concat(formattedEarlierMessages),
      );
      setLoadingEarlier(false);
    } catch (error) {
      console.log(error);
    }
  }, [user, receiver, messages]);

  const onSend = useCallback(
    async (messages = []) => {
      if (messages.length > 0) {
        const newMsgObj = messages[0];
        Keyboard.dismiss();

        try {
          const sendResult = await message.sendMessage(
            receiver._id,
            newMsgObj.text,
            user.token,
          );

          const newMessage = sendResult.data.data;

          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, [
              {
                _id: newMessage._id,
                text: newMessage.content,
                createdAt: newMessage.createdAt,
                isDeleted: newMessage.isDeleted,
                user: {
                  _id: newMessage.user._id,
                  name: newMessage.user.username,
                },
              },
            ]),
          );

          dispatch(chatActions.updateSeenStatus(newMessage.chat._id));
          if (!chatId) {
            setChatId(newMessage.chat._id);
          }

          socket?.emit('sendMessage', {
            chatId: newMessage.chat._id,
            _id: newMessage._id,
            senderId: user.id,
            senderAvatar: `${ASSET_API_URL}/${newMessage.user.avatar.fileName}`,
            receivedId: receiver._id,
            userName: receiver.username,
            userImg: receiver.avatar.fileName,
            content: newMessage.content,
            createdAt: newMessage.createdAt,
          });
        } catch (err) {
          console.log(err);
        }
      }
    },
    [user, receiver],
  );

  const onDelete = async (messageIdToDelete, chatId) => {
    try {
      await message.deleteMessage(messageIdToDelete, user.token);
    } catch (err) {
      Toast.showFailureMessage('Error deleting message');
      return;
    }

    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg._id == messageIdToDelete) {
          return {
            ...msg,
            isDeleted: true,
            text: 'Message unsent',
          };
        }
        return msg;
      }),
    );

    socket?.emit('deleteMessage', {
      _id: messageIdToDelete,
      chatId,
      userId: user.id,
      isLatest: messageIdToDelete == messages[0]._id,
    });
  };

  const onLongPress = (context, message) => {
    if (message.user._id == user.id && !message.isDeleted) {
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
              onDelete(message._id, message.chat);
              break;
          }
        },
      );
    }
  };
  const onPressUnblockUser = async () => {
    try {
      await message.unBlockChat(receiver._id, user.token);
      setBlocked(false);
      socket?.emit('unblock', {
        userId: user.id,
        receivedId: receiver._id,
      });
    } catch (error) {
      console.log(error);
      Toast.showFailureMessage('Error unblock');
    }
  };

  useEffect(() => {
    if (route.params) {
      setReceiver(route.params.receiver);
    }

    navigation.setOptions({
      title:
        route.params && route.params.receiver
          ? route.params.receiver.username
          : null,
      headerRight: () => (
        <Icon
          type="feather"
          name="more-horizontal"
          size={32}
          style={{ marginRight: 10 }}
          onPress={() =>
            navigation.navigate(stacks.chatSetting.name, {
              chatId,
              receiver,
            })
          }
        />
      ),
      headerLeft: () => (
        <HeaderBackButton style={{ marginLeft: 0 }} onPress={handleBack} />
      ),
    });
  }, [route, navigation, chatId, receiver]);

  useEffect(() => {
    const initialize = async () => {
      const newMessages = await fetchMessages();
      if (newMessages && newMessages.data.length > 0) {
        setMessages(
          newMessages.data.map((msg) => {
            return {
              ...msg,
              text: !msg.isDeleted ? msg.content : 'Message unsent',
              user: {
                _id: msg.user._id,
                name: msg.user.username,
                avatar: `${ASSET_API_URL}/${msg.user.avatar.fileName}`,
              },
            };
          }),
        );
        setChatId(newMessages.data[0].chat);
        dispatch(chatActions.updateSeenStatus(newMessages.data[0].chat));
        setBlocked(newMessages.blockStatus.blocked);
        setIsBlocked(newMessages.blockStatus.isBlocked);
      }
    };
    if (user && receiver) {
      initialize();
    }
    return () => {};
  }, [user, receiver]);

  useEffect(() => {
    if (chatId) {
      dispatch(chatActions.updateCurrentChatRoom(chatId));
    }
  }, [chatId]);

  useEffect(() => {
    socket?.on('getMessage', (data) => {
      if (chatId == data.chatId && user.id == data.receivedId) {
        const newMsg = {
          _id: data._id,
          text: data.content,
          createdAt: data.createdAt,
          user: {
            _id: data.senderId,
            avatar: data.senderAvatar,
          },
        };

        // mark as seen
        message.updateLastSeenMessage(data._id, data.chatId, user.token);

        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [newMsg]),
        );
      }
    });

    socket?.on('blockChat', (data) => {
      if (
        user.id == data.userId &&
        receiver &&
        receiver._id == data.receivedId
      ) {
        setBlocked(true);
      } else if (
        user.id == data.receivedId &&
        receiver &&
        receiver._id == data.userId
      ) {
        setIsBlocked(true);
      }
    });

    socket?.on('unblockChat', (data) => {
      if (
        user.id == data.userId &&
        receiver &&
        receiver._id == data.receivedId
      ) {
        setBlocked(false);
      } else if (
        user.id == data.receivedId &&
        receiver &&
        receiver._id == data.userId
      ) {
        setIsBlocked(false);
      }
    });

    socket?.on('removeMess', (data) => {
      if (chatId == data.chatId) {
        setMessages((previousMessages) =>
          previousMessages.map((msg) => {
            if (msg._id == data._id) {
              return {
                ...msg,
                isDeleted: true,
                text: 'Message unsent',
              };
            }
            return msg;
          }),
        );
      }
    });
    return () => {};
  }, [chatId, socket, user, receiver]);

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
    if (props.currentMessage.isDeleted == true) {
      return (
        <Bubble
          {...props}
          textStyle={{
            right: {
              color: '#000000',
              fontStyle: 'italic',
            },
            left: {
              color: '#000000',
              fontStyle: 'italic',
            },
          }}
          wrapperStyle={{
            right: {
              backgroundColor: '#FFFFFF',
            },
            left: {
              backgroundColor: '#FFFFFF',
            },
          }}
        />
      );
    } else {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#2e64e5',
            },
            left: {
              backgroundColor: '#fff2cc',
            },
          }}
          textStyle={{
            right: {
              color: '#fff',
            },
          }}
        />
      );
    }
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  const renderInputToolbar = (props) => {
    if (!blocked) {
      if (!isBlocked) {
        return <InputToolbar {...props}></InputToolbar>;
      } else {
        return (
          <ListItem
            style={{
              marginTop: -20,
            }}
          >
            <ListItem.Title
              style={{
                marginLeft: 46,
              }}
            >
              You have been blocked by this user
            </ListItem.Title>
          </ListItem>
        );
      }
    } else {
      return (
        <ListItem
          style={{
            marginTop: -20,
          }}
        >
          <ListItem.Title>You have blocked this user</ListItem.Title>
          <Button
            onPress={onPressUnblockUser}
            title="Unblock"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </ListItem>
      );
    }
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: user.id,
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
      renderInputToolbar={renderInputToolbar}
    />
  );
};

export default ChatScreen;
