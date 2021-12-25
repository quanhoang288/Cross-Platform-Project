import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Avatar, ListItem, Text, Badge, Icon } from 'react-native-elements';

import { useNavigation, useRoute } from '@react-navigation/native';
import { stacks } from '../../constants/title';
import { useDispatch, useSelector } from 'react-redux';
import { ASSET_API_URL } from '../../configs';

const MessageScreen = () => {
  const navigation = useNavigation();
  const chatList = useSelector((state) => state.chat.chats);

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
              receiverName: item.userName,
              receiverImg: item.userImg,
            })
          }
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
