import React,{useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Avatar,
  ListItem,
  Text,
  Badge,
} from 'react-native-elements';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stacks } from '../../constants/title';
import { message } from '../../apis';
import { useSelector } from 'react-redux';
import { SOCKET_URL } from '../../configs';
import {io} from 'socket.io-client';
const MessageScreen = ({ navigation }) => {

  const user = useSelector(state => state.auth.user);
  const [chatList, setChatList] = useState([]);
  const socket = useRef();
  const fetchChats = async () => {
    try {
        const res = await message.getChats(user.id, user.token);
        return res.data.data;
        
        
    } catch (err) {
        console.log(err.message);
    }
  }
  useEffect(()=>{
    const initialize = async () => {
      const newChatList = await fetchChats()
      if(newChatList){
        setChatList(newChatList.map(chat =>({
          id: chat._id,
          userName: chat.member.find(u => u.id !== user.id).username,
          userImg: require('../../../assets/avatar2.jpg'),
          unreadMessages: 20,
          messageText: chat.latestMessage.content,
          userId: user.id
        }))
        );
      };
      socket.current = io(SOCKET_URL);
    }
    initialize();
  }, []);
  useEffect(() => {
    socket.current?.on('refreshLatestMessage', (data) =>{
      setChatList(chatList.map(chat => {
        if(chat.id !== data.chatId){
          return chat;
        }
        return{
          ...chat,
          messageText: data.content,
        }
      }))
    })
    
  }, [socket])
    return (
      <FlatList 
        data={chatList}
        keyExtractor={item=>item.id}
        renderItem={({item}) =>(
          <TouchableOpacity onPress={() => navigation.navigate(stacks.chatScreen.name, {
            chatId: item.id,
            receivedId: item.userId,
          })}>
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
                  <Badge value={item.unreadMessages} badgeStyle={{backgroundColor: '#25D366'}}/> 
              </ListItem>
          </View>
          </TouchableOpacity>
        )}
      />
    );
};


const styles = StyleSheet.create({

})

export default MessageScreen;