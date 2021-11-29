import React,{useEffect, useState} from 'react';
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
// const messages = [
//   {
//     id: '1',
//     userName: 'Quan Hoang',
//     userImg: require('../../../assets/avatar2.jpg'),
//     unreadMessages: 20,
//     messageText:
//       'Hom nay toi co don qua',
//   },
  
// ];
const MessageScreen = ({ navigation }) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRydW5ndnVob2FuZyIsImlkIjoiNjE4ZTk3NTg3NDU1MGEyMmE0Y2IyYTkwIiwiaWF0IjoxNjM2NzM0ODA5fQ.NwBPkKkhl8IHr64k-4EwTPMhtzY2IM0J6TXqm8c-DNk";
  const userId = '618e975874550a22a4cb2a90';
  const [ChatList, setChatList] = useState([]);
  const fetchChats = async () => {
    try {
        const res = await message.getChats(userId, token);
        return res.data.data;
        
    } catch (err) {
        console.log(err.message);
    }
  }
  useEffect(()=>{
    const initialize = async () => {
      const newChatList = await fetchChats()
      console.log(newChatList[0])
      // setChatList([
      //   {
      //     id: '1',
      //     userName: 'Quan Hoang',
      //     userImg: require('../../../assets/avatar2.jpg'),
      //     unreadMessages: 20,
      //     messageText:
      //       'Hom nay toi co don qua',
      //   },
      // ]);
      if(newChatList){
        setChatList(newChatList.map(chat =>({
          id: chat._id,
          userName: chat.member[1].username,
          userImg: require('../../../assets/avatar2.jpg'),
          unreadMessages: 20,
          messageText: chat.latestMessage.content,
        }))
        );
      };
      
    }
    initialize();
  }, []);
    return (
                <FlatList data={ChatList}
                          keyExtractor={item=>item.id}
                          renderItem={({item}) =>(
                          <TouchableOpacity onPress={() => navigation.navigate(stacks.chatScreen.name)}>
                          
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