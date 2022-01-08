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

const NewMessage = () => {
  // user
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();

  // valueInput and resultSearch
  const [value, setValue] = useState('');
  const [listFriend, setListFriend] = useState([]);

  const fetchFriendList = async () => {
    try {
      const res = await friend.getListFriends(null, user.token);
      return res.data.data.friends;
    } catch (err) {
      console.log(err.message);
    }
  };
  // API search
  const handleSearch = (keyword, newListFriend) => {
    if (keyword === '') {
      setListFriend([]);
      return;
    } else {
      setListFriend(
        newListFriend.filter((item) => item.name.includes(keyword)),
      );
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const newListFriend = await fetchFriendList();
      const nListFriend = newListFriend.map((friend) => ({
        id: friend._id,
        name: friend.username,
      }));
      handleSearch(value, nListFriend);
    };
    initialize();
  }, [value]);
  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(stacks.chatScreen.name, {
            receivedId: item._id,
          })
        }
      >
        <View>
          <ListItem>
            <Avatar
              rounded
              size={40}
              source={require('../../../assets/avatar2.jpg')}
            />
            <ListItem.Content>
              <ListItem.Title>
                <Text>{item.name}</Text>
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        platform={Platform.OS}
        searchIcon={{ size: 24 }}
        onChangeText={(text) => setValue(text)}
        onClear={() => setValue('')}
        placeholder="Type Here..."
        value={value}
      />
      <FlatList
        data={listFriend}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
});
export default NewMessage;
