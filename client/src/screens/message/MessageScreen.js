import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
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
import { chatActions } from '../../redux/actions';
import { message } from '../../apis';
const MessageScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isRefreshing, setRefreshing] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const chatList = useSelector((state) => state.chat.chats);

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
      setRefreshing(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleViewChat = (item) => {
    navigation.navigate(stacks.chatScreen.name, {
      receiver: {
        _id: item.receivedId,
        username: item.userName,
        avatar: item.userImg,
      },
    });
  };

  useEffect(() => {
    if (isRefreshing) {
      fetchChats();
    }
  }, [isRefreshing]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          type="entypo"
          name="new-message"
          size={32}
          style={{ marginRight: 10 }}
          onPress={() => navigation.navigate(stacks.newMessage.name)}
        />
      ),
    });
  }, [navigation]);

  return (
    <FlatList
      data={chatList}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => setRefreshing(true)}
        />
      }
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleViewChat(item)}>
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
