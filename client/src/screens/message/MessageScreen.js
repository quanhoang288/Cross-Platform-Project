import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import {
  Avatar,
  Divider,
  ListItem,
  Text,
  Badge,
  Icon,
} from 'react-native-elements';

import { useNavigation, useRoute } from '@react-navigation/native';
import { stacks } from '../../constants/title';
import { useDispatch, useSelector } from 'react-redux';
import { ASSET_API_URL } from '../../configs';
import { formatDate } from '../../helpers';
const MessageScreen = () => {
  const navigation = useNavigation();
  const chatList = useSelector((state) => state.chat.chats);
  const [listChat, setListChat] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const token = user.token;
  const socket = useSelector((state) => state.auth.socket);
  useEffect(() => {
    setListChat(chatList);
    console.log(listChat);
  }, [listChat]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          type="entypo"
          name="new-message"
          size={32}
          style={{ marginRight: 10 }}
          onPress={() => navigation.navigate(stacks.searchMessage.name)}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    socket?.on('renderBlock', (data) => {
      setListChat(
        listChat.map((chat) => {
          if (chat.receivedId == data.userId) {
            return {
              ...chat,
              isBlocked: true,
            };
          }
          if (chat.receivedId == data.receivedId) {
            return {
              ...chat,
              blocked: true,
            };
          }
          return chat;
        }),
      );
    });
  }, [socket]);
  useEffect(() => {
    socket?.on('renderUnblock', (data) => {
      setListChat(
        listChat.map((chat) => {
          if (chat.receivedId == data.userId) {
            return {
              ...chat,
              isBlocked: false,
            };
          }
          if (chat.receivedId == data.receivedId) {
            return {
              ...chat,
              blocked: false,
            };
          }
          return chat;
        }),
      );
    });
  }, [socket]);

  const handleClick = (item, user) => {
    navigation.navigate(stacks.chatScreen.name, {
      receivedId: item.receivedId,
      receiverName: item.userName,
      receiverImg: item.userImg,
      blocked: item.blocked,
      isBlocked: item.isBlocked,
    });
  };
  return (
    <FlatList
      data={listChat}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleClick(item, user)}
          // onPress={() => {
          //   navigation.navigate(stacks.chatScreen.name, {
          //     receivedId: item.receivedId,
          //     receiverName: item.userName,
          //     receiverImg: item.userImg,
          //   });
          // }}
        >
          <View>
            <ListItem>
              <Avatar
                rounded
                size={40}
                source={{
                  uri: `${ASSET_API_URL}/${item.userImg}`,
                }}
              />
              <ListItem.Content>
                <ListItem.Title>
                  {item.numUnseenMessages > 0 ? (
                    <Text style={{ fontWeight: 'bold' }}>{item.userName}</Text>
                  ) : (
                    <Text>{item.userName}</Text>
                  )}
                </ListItem.Title>
                <View>
                  {item.numUnseenMessages > 0 ? (
                    <Text style={{ fontWeight: 'bold' }}>
                      {item.messageText}
                    </Text>
                  ) : (
                    <Text>{item.messageText}</Text>
                  )}
                </View>
              </ListItem.Content>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <Text style={{ marginBottom: 10 }}>
                  {formatDate(item.latestMessageSentAt)}
                </Text>
                {item.numUnseenMessages > 0 && (
                  <Badge value={item.numUnseenMessages} status="error" />
                )}
              </View>
            </ListItem>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default MessageScreen;
