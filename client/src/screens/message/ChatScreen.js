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
import { SOCKET_URL } from '../../configs';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, ListItem, Button, Text } from 'react-native-elements';
import { stacks } from '../../constants/title';
import { chatActions } from '../../redux/actions';
import { Toast } from '../../helpers';
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
  const [isBlocked, setIsBlocked] = useState(route.params.isBlocked);
  const [blocked, setBlocked] = useState(route.params.blocked);
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
              receivedId: receivedId,
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
          newMessages.map((msg) => {
            if (msg.isDeleted == false) {
              return {
                ...msg,
                _id: msg._id,
                text: msg.content,
                createdAt: msg.createdAt,
                isDeleted: msg.isDeleted,
                user: {
                  _id: msg.user._id,
                  name: msg.user.username,
                },
              };
            } else {
              return {
                ...msg,
                _id: msg._id,
                text: 'Message unsent',
                createdAt: msg.createdAt,
                isdeleted: msg.isDeleted,
                user: {
                  _id: msg.user._id,
                  name: msg.user.username,
                },
              };
            }
          }),
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
        setMessages(
          messages.map((msg) => {
            if (msg._id == messageIdToDelete) {
              return {
                ...msg,
                isDeleted: true,
                text: 'Message unsent',
              };
            }
            return msg;
          }),
          // previousMessages.filter((messages) => messages._id !== messageIdToDelete),
        );
      }
    });

    socket?.on('beBlocked', (data) => {
      if (user.id == data.receivedId) {
        setIsBlocked(true);
      }
    });

    // socket?.on('blocked', (data) => {
    //   if (user.id == data.userId){
    //     set
    //   }
    // })
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

  const onDelete = async (messageIdToDelete) => {
    console.log(chatId, 'hihi');
    const deleteMess = await message.deleteMessage(messageIdToDelete, token);
    setMessages(
      messages.map((msg) => {
        if (msg._id == messageIdToDelete) {
          return {
            ...msg,
            isDeleted: true,
            text: 'Message unsent',
          };
        }
        return msg;
      }),
      // previousMessages.filter((messages) => messages._id !== messageIdToDelete),
    );

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
  const onPressUnblockUser = async () => {
    try {
      const rs = await message.unBlockChat(receivedId, token);
      setBlocked(false);
    } catch (error) {
      console.log(error);
      Toast.showFailureMessage('Error unblock');
    }
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
            title="Unblock this user"
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
      renderInputToolbar={renderInputToolbar}
    />
  );
};

export default ChatScreen;
