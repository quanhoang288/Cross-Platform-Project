import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Button,
} from 'react-native';
import {
  Avatar,
  FAB,
  Icon,
  ListItem,
  Text,
  Badge,
  Tab,
} from 'react-native-elements';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { ConversationItem } from '../components/chat';

// const ScreenWidth = Dimensions.get('window').width;
const Messages = [
  {
    id: '1',
    userName: 'Quan Hoang',
    userImg: require('../../assets/avatar2.jpg'),
    unreadMessages: 20,
    messageText:
      'Hom nay toi co don qua',
  },
  {
    id: '2',
    userName: 'TungNX',
    userImg: require('../../assets/avatar3.jpg'),
    unreadMessages: 4,
    messageText:
      'Nho Khanh Van',
  },
  {
    id: '3',
    userName: 'Trung',
    userImg: require('../../assets/avatar.jpg'),
    unreadMessages: 5,
    messageText:
      'xin chao',
  },
  {
    id: '4',
    userName: 'MessiThanh',
    userImg: require('../../assets/avatar3.jpg'),
    unreadMessages: 2,
    messageText:
      'hom nay toi buon',
  },
  {
    id: '5',
    userName: 'Duong',
    userImg: require('../../assets/avatar3.jpg'),
    unreadMessages: 10,
    messageText:
      'ai nhan tin minh ik',
  },
  {
    id: '6',
    userName: 'Truong',
    userImg: require('../../assets/avatar3.jpg'),
    unreadMessages: 5,
    messageText:
      'hello',
  },
  {
    id: '7',
    userName: 'Vanh',
    userImg: require('../../assets/avatar3.jpg'),
    unreadMessages: 5,
    messageText:
      'choi game ko',
  },
  {
    id: '1',
    userName: 'Quan Hoang',
    userImg: require('../../assets/avatar2.jpg'),
    unreadMessages: 20,
    messageText:
      'Hom nay toi co don qua',
  },
  {
    id: '2',
    userName: 'TungNX',
    userImg: require('../../assets/avatar3.jpg'),
    unreadMessages: 4,
    messageText:
      'Nho Khanh Van',
  },
  {
    id: '3',
    userName: 'Trung',
    userImg: require('../../assets/avatar.jpg'),
    unreadMessages: 5,
    messageText:
      'xin chao',
  },
  {
    id: '4',
    userName: 'MessiThanh',
    userImg: require('../../assets/avatar3.jpg'),
    unreadMessages: 2,
    messageText:
      'hom nay toi buon',
  },
  {
    id: '5',
    userName: 'Duong',
    userImg: require('../../assets/avatar3.jpg'),
    unreadMessages: 10,
    messageText:
      'ai nhan tin minh ik',
  },
  {
    id: '6',
    userName: 'Truong',
    userImg: require('../../assets/avatar3.jpg'),
    unreadMessages: 5,
    messageText:
      'hello',
  },
];
const MessageScreen = ({ navigation }) => {
    return (
        <View>
            <ScrollView>
                <FlatList data={Messages}
                          keyExtractor={item=>item.id}
                          renderItem={({item}) =>(
                          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
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

            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({

})

export default MessageScreen;