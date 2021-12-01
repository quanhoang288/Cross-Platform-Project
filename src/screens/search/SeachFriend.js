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

const SearchFriend = () =>{

    // user
    const user = useSelector(state => state.auth.user);

    // valueInput and resultSearch
    const [value, setValue] = useState("");
    const [listSuggestFriend, setListSuggestFriend] = useState([]);

    // API search
    const handleSearch = (keyword) => {
        if(keyword === ""){
            setListSuggestFriend([]);
            return;
        }
        search.searchFriend(keyword, user.token)
        .then(result => {
            const curList = result.data.data;
            setListSuggestFriend(curList);
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        handleSearch(value);
    }, [value]);

    // status of friend
    const [status, setStatus] = useState(false);

    // API send friendRequest
    const sendRequest = (userId) => {
        // console.log("true");
        friend.sendFriendRequest(userId, user.token)
        .then(result => {
            setStatus(true);
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
                onChangeText={(text) => setValue(text)}
                onClear={() => setValue("")}
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
                                source={require('../../../assets/avatar2.jpg')} 
                            />
                            
                            <ListItem.Content>
                                <ListItem.Title>
                                    <Text>{item.username}</Text>
                                </ListItem.Title>
                            </ListItem.Content>
                            <TouchableOpacity>
                                {/* <Button 
                                    title="Send request" 
                                    onPress = {() => sendRequest(item._id)}
                                /> */}
                                <Icon
                                    name={status ? "checkcircleo": "adduser"}
                                    type="antdesign"
                                    size={32}
                                    color={status ? "green": "black"}
                                    onPress = {() => sendRequest(item._id)}
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