import React, { useState, useEffect } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import {
  Avatar,
  ListItem,
  Text,
  SearchBar,
  Button,
  Icon,
} from 'react-native-elements';

import { friend, search } from '../../apis';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { stacks } from '../../constants/title';


const SearchMessage = () =>{

    // user
    const user = useSelector(state => state.auth.user);

    const navigation = useNavigation();

    // valueInput and resultSearch
    const [value, setValue] = useState("");
    const [listFriend, setListFriend] = useState([]);

    const fetchFriendList = async () => {
        try {
            const res = await friend.getListFriends(null,user.token);
            return res.data.data.friends;
               
        } catch (err) {
            console.log(err.message);
        }
      }
    // API search
    const handleSearch = async(keyword) => {
        
        console.log(newListFriend)
        if(keyword === ""){
            setListFriend([]);
            return;
        }
        else{
            setListFriend(newListFriend.map(friend => {
                if (friend.username.includes(keyword)){
                    return {
                        id: friend._id,
                        username: friend.username,
                        userImg: require('../../../assets/avatar2.jpg'),
                    };
                }
            }))
               
            
        }
    }
    

    useEffect(() => {
        const newListFriend = await fetchFriendList();
        
        handleSearch(value);
    }, []);

    
    return(
        <SafeAreaView style={styles.container}>
            <SearchBar
                platform={Platform.OS}
                searchIcon={{ size: 24 }}
                onChangeText={(text) => setValue(text)}
                onClear={() => setValue("")}
                placeholder="Type Here..."
                value={value}
            />
            <FlatList 
        data={listFriend}
        keyExtractor={item=>item.id}
        renderItem={({item}) =>(
          <TouchableOpacity onPress={() => navigation.navigate(stacks.chatScreen.name, {
            receivedId: item.id,
            chatId: "",
          })}>
          <View>
              <ListItem>
                  <Avatar rounded size={40} source={item.userImg} />
                  <ListItem.Content>
                      <ListItem.Title>
                          <Text>{item.userName}</Text>
                      </ListItem.Title>
                      
                  </ListItem.Content>
              </ListItem>
          </View>
          </TouchableOpacity>
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
export default SearchMessage;