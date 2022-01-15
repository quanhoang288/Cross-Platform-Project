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
import { ASSET_API_URL } from '../../configs';

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
      setListFriend(newListFriend);
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
        avatar: friend.avatar,
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
            receiver: {
              _id: item.id,
              username: item.name,
              avatar: item.avatar.fileName,
            },
          })
        }
      >
        <View>
          <ListItem>
            <Avatar
              rounded
              size={40}
              source={{ uri: `${ASSET_API_URL}/${item.avatar.fileName}` }}
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
