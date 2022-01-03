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
  const user = useSelector((state) => state.auth.user);
  const token = user.token;
  const socket = useSelector((state) => state.auth.socket);
  console.log(chatList);
  // useEffect(() => {
  //   socket.on?("update chatlist", (data) =>{
  //     chatList.map((list) =>{

  //     })
  //   });
  // },[])
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

  // useEffect(() => {
  //   const initialize = async () => {
  //     const blocklist = await getBlockList(chatList[0].receivedId);
  //     console.log(blocklist.blocked_inbox);
  //   };
  //   initialize();
  // }, []);
  console.log(chatList[0].receivedId);
  console.log(user.id);

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
      data={chatList}
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
