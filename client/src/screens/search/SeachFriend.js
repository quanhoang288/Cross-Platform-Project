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
import { Empty } from '../../components/emptyAndError';

const SearchFriend = () => {
  // user
  const user = useSelector((state) => state.auth.user);

  const navigation = useNavigation();

  // valueInput and resultSearch
  const [value, setValue] = useState('');
  const [listSuggestFriend, setListSuggestFriend] = useState([]);

  // API search
  const handleSearch = (keyword) => {
    if (keyword === '') {
      setListSuggestFriend([]);
      return;
    }
    search
      .searchFriend(keyword, user.token)
      .then((result) => {
        const curList = result.data.data;
        setListSuggestFriend(curList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleSearch(value);
  }, [value]);

  const _renderItem = ({ item }) => (
    <View>
      <ListItem
        onPress={() =>
          navigation.navigate(stacks.profile.name, { userId: item._id })
        }
      >
        <Avatar
          rounded
          size={40}
          source={require('../../../assets/avatar2.jpg')}
        />

        <ListItem.Content>
          <ListItem.Title>
            <Text>{item.username}</Text>
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );

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
      {listSuggestFriend.length == 0 ? (
        <Empty title={'Search for friends'} />
      ) : (
        <FlatList
          data={listSuggestFriend}
          keyExtractor={(item) => item._id}
          renderItem={_renderItem}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
});
export default SearchFriend;
