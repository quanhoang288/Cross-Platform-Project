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
import { friend, search } from '../../apis';
import { useSelector } from 'react-redux';
import { error } from 'react-native-gifted-chat/lib/utils';
// const InputFieldsStyle = {
//     borderWidth: 0,
    
//   };


const SearchFriend = () =>{

    // user
    const user = useSelector(state => state.auth.user);

    // valueInput and resultSearch
    const [value, setValue] = useState("");
    const [listSuggestFriend, setListSuggestFriend] = useState([]);

    // API search
    const resultSearch = (keyword) => {
        search.searchFriend(keyword, user.token)
        .then(result => {
            const curList = result.data.data;
            setListSuggestFriend(curList);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const actionSearch = (keyword) => {
        if(keyword){
            resultSearch(keyword);
            setValue(keyword);
        }
        else{
            setValue("");
            setListSuggestFriend([]);
        }
    }

    // status of friend
    const [status, setStatus] = useState("");
    // API send friendRequest
    const sendRequest = (userId) => {
        friend.sendFriendRequest(userId, user.token)
        .then(result => {
            console.log(result.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    return(
        <SafeAreaView style={styles.container}>
            <SearchBar
                platform={Platform.OS}
                searchIcon={{ size: 24 }}
                onChangeText={(text) => actionSearch(text)}
                onClear={() => actionSearch("")}
                placeholder="Type Here..."
                value={value}
            />
            <FlatList data={listSuggestFriend}
                keyExtractor={item => item._id}
                renderItem={({item}) =>(
                    <View>
                        <ListItem>
                            <Avatar 
                                rounded size={40} 
                                source={require('../../../assets/avatar.jpg')} 
                            />
                            
                            <ListItem.Content>
                                <ListItem.Title>
                                    <Text>{item.username}</Text>
                                </ListItem.Title>
                            </ListItem.Content>
                            <TouchableOpacity>
                                <Button 
                                    title="Send request" 
                                    onPress = {() => {}}
                                />
                            </TouchableOpacity>
                        </ListItem>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight
    },
})
export default SearchFriend;