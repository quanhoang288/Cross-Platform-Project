import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Avatar, ListItem, Text, Badge, Icon } from 'react-native-elements';

import { useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stacks } from '../../constants/title';
import { message } from '../../apis';
import { useSelector } from 'react-redux';

const MessageScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const [chatList, setChatList] = useState([]);
  // const socket = useRef();
  const socket = useSelector((state) => state.auth.socket);
  const fetchChats = async () => {
    try {
      const res = await message.getChats(user.token);
      return res.data.data;
    } catch (err) {
      console.log(err.message);
    }
  };

  const initialize = async () => {
    const newChatList = await fetchChats();
    if (newChatList) {
      setChatList(
        newChatList.map((chat) => ({
          id: chat._id,
          userName: chat.member.find((u) => u._id !== user.id).username,
          userImg: require('../../../assets/avatar2.jpg'),
          unreadMessages: 20,
          messageText: chat.latestMessage.content,
          receivedId: chat.member.find((i) => i._id !== user.id)._id,
        })),
      );
    }
    // socket.current = io(SOCKET_URL);
  };

  useEffect(() => {
    // if (route.name === stacks.messageScreen.name) {
    //   initialize();
    // }
    initialize();
  }, []);

  useEffect(() => {
    socket?.on('getMessage', (data) => {
      const { senderId, receivedId } = data;
      if (user.id === senderId || user.id === receivedId) {
        console.log('update latest message');
        console.log(data);
        setChatList(
          chatList.map((chat) => {
            if (chat.id !== data.chatId) {
              return chat;
            }
            return {
              ...chat,
              messageText: data.content,
            };
          }),
        );
      }
    });
  }, [socket, user]);

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
  return (
    <FlatList
      data={chatList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(stacks.chatScreen.name, {
              receivedId: item.receivedId,
            })
          }
        >
          <View>
            <ListItem>
              <Avatar rounded size={40} source={item.userImg} />
              <ListItem.Content>
                <ListItem.Title>
                  <Text>{item.userName}</Text>
                </ListItem.Title>
                <View>
                  <Text>{item.messageText}</Text>
                </View>
              </ListItem.Content>
              <Badge
                value={item.unreadMessages}
                badgeStyle={{ backgroundColor: '#25D366' }}
              />
            </ListItem>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default MessageScreen;
