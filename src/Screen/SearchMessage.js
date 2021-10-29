import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Button,
  TextInput,
} from 'react-native';
import {
  Avatar,
  FAB,
  Icon,
  ListItem,
  Text,
  Badge,
  Tab,
  SearchBar,
} from 'react-native-elements';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// const InputFieldsStyle = {
//     borderWidth: 0,
    
//   };

const SuggestFriend =[
    {
        id: '1',
        UserName: 'Trung Vu Hoang',
        UserImg : require('../../assets/avatar.jpg'),
    },
    {
        id: '2',
        UserName: 'Quan Hoang Huy',
        UserImg : require('../../assets/avatar2.jpg'),
    },
    {
        id: '3',
        UserName: 'Nguyen Xuan Tung',
        UserImg : require('../../assets/avatar3.jpg'),
    },
    {
        id: '1',
        UserName: 'Trung Vu Hoang',
        UserImg : require('../../assets/avatar.jpg'),
    },
    {
        id: '2',
        UserName: 'Quan Hoang Huy',
        UserImg : require('../../assets/avatar2.jpg'),
    },
    {
        id: '3',
        UserName: 'Nguyen Xuan Tung',
        UserImg : require('../../assets/avatar3.jpg'),
    },
    {
        id: '1',
        UserName: 'Trung Vu Hoang',
        UserImg : require('../../assets/avatar.jpg'),
    },
    {
        id: '2',
        UserName: 'Quan Hoang Huy',
        UserImg : require('../../assets/avatar2.jpg'),
    },
    {
        id: '3',
        UserName: 'Nguyen Xuan Tung',
        UserImg : require('../../assets/avatar3.jpg'),
    },
    {
        id: '1',
        UserName: 'Trung Vu Hoang',
        UserImg : require('../../assets/avatar.jpg'),
    },
    {
        id: '2',
        UserName: 'Quan Hoang Huy',
        UserImg : require('../../assets/avatar2.jpg'),
    },
    {
        id: '3',
        UserName: 'Nguyen Xuan Tung',
        UserImg : require('../../assets/avatar3.jpg'),
    },
    {
        id: '1',
        UserName: 'Trung Vu Hoang',
        UserImg : require('../../assets/avatar.jpg'),
    },
    {
        id: '2',
        UserName: 'Quan Hoang Huy',
        UserImg : require('../../assets/avatar2.jpg'),
    },
    {
        id: '3',
        UserName: 'Nguyen Xuan Tung',
        UserImg : require('../../assets/avatar3.jpg'),
    },
]

const SearchBarCustom = (props) => {
    const [value, setValue] = useState('');
    return <SearchBar value={value} onChangeText={setValue} {...props} />;
  };

const SearchMessage = ({navigation}) =>{
    return(
        <View>
        <SearchBarCustom
          placeholder="Search here"
          platform="ios"
          
        />
        <View>
        <ScrollView>
            <FlatList data={SuggestFriend}
                          keyExtractor={item=>item.id}
                          renderItem={({item}) =>(
                          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                          <View>
                              <ListItem>
                                  <Avatar rounded size={40} source={item.UserImg} />
                                  <ListItem.Content>
                                      <ListItem.Title>
                                          <Text>{item.UserName}</Text>
                                      </ListItem.Title>
                                  </ListItem.Content>
                                 
                              </ListItem>
                          </View>
                          </TouchableOpacity>
                          )}
            />
        </ScrollView>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar:{
        backgroundColor:'white'
    }
})
export default SearchMessage;