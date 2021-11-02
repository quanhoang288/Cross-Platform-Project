import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Platform,
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
  Button,
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
        UserImg : require('../../../assets/avatar.jpg'),
    },
    {
        id: '2',
        UserName: 'Quan Hoang Huy',
        UserImg : require('../../../assets/avatar2.jpg'),
    },
    {
        id: '3',
        UserName: 'Nguyen Xuan Tung',
        UserImg : require('../../../assets/avatar3.jpg'),
    },
    {
        id: '4',
        UserName: 'Trung Vu Hoang',
        UserImg : require('../../../assets/avatar.jpg'),
    },
    {
        id: '5',
        UserName: 'Quan Hoang Huy',
        UserImg : require('../../../assets/avatar2.jpg'),
    },
    {
        id: '6',
        UserName: 'Nguyen Xuan Tung',
        UserImg : require('../../../assets/avatar3.jpg'),
    },
    {
        id: '7',
        UserName: 'Trung Vu Hoang',
        UserImg : require('../../../assets/avatar.jpg'),
    },
    {
        id: '8',
        UserName: 'Quan Hoang Huy',
        UserImg : require('../../../assets/avatar2.jpg'),
    },
    {
        id: '9',
        UserName: 'Nguyen Xuan Tung',
        UserImg : require('../../../assets/avatar3.jpg'),
    },
    {
        id: '10',
        UserName: 'Trung Vu Hoang',
        UserImg : require('../../../assets/avatar.jpg'),
    },
    {
        id: '11',
        UserName: 'Quan Hoang Huy',
        UserImg : require('../../../assets/avatar2.jpg'),
    },
    {
        id: '12',
        UserName: 'Nguyen Xuan Tung',
        UserImg : require('../../../assets/avatar3.jpg'),
    },
    {
        id: '13',
        UserName: 'Trung Vu Hoang',
        UserImg : require('../../../assets/avatar.jpg'),
    },
    {
        id: '14',
        UserName: 'Quan Hoang Huy',
        UserImg : require('../../../assets/avatar2.jpg'),
    },
    {
        id: '15',
        UserName: 'Nguyen Xuan Tung',
        UserImg : require('../../../assets/avatar3.jpg'),
    },
]

const SearchBarCustom = (props) => {
    const [value, setValue] = useState('');
    return <SearchBar value={value} onChangeText={setValue} {...props} />;
  };
// handlerSearch= (text) =>{
//     const formattedQuery = text.toLowerCase()
//     const data = 
// }
const SearchFriend = () =>{
    return(
        <SafeAreaView style={styles.container}>
          <SearchBarCustom
            placeholder="Search here"
            platform={Platform.OS}
          //   onChangeText={this.handlerSearch}
          />
        {/* <ScrollView> */}
            <FlatList data={SuggestFriend}
                          keyExtractor={item=>item.id}
                          renderItem={({item}) =>(
                          <View>
                              <ListItem>
                                  <Avatar rounded size={40} source={item.UserImg} />
                                  
                                  <ListItem.Content>
                                      <ListItem.Title>
                                          <Text>{item.UserName}</Text>
                                      </ListItem.Title>
                                  </ListItem.Content>
                                  <TouchableOpacity>
                                  <Button
                                  title="Send request"
                                  
                                  />
                                  </TouchableOpacity>
                              </ListItem>
                          </View>
                          )}
            />
          {/* </ScrollView> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight
    },
})
export default SearchFriend;