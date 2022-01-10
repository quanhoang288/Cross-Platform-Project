import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView } from 'react-native';
import ProfileItem from '../../components/account/ProfileItem.jsx';
import { friend } from '../../apis';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { stacks } from '../../constants/title.js';
import { ASSET_API_URL } from '../../configs/index.js';
import Empty from '../../components/emptyAndError/Empty.jsx';

const ListFriend = () => {
  // user
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();

  const route = useRoute();
  const [userId, setUserId] = useState(
    route.params && route.params.userId ? route.params.userId : null,
  );

  // API getListFriend
  const [listFriend, setListFriend] = useState([]);
  useEffect(() => {
    friend
      .getListFriends(userId, user.token)
      .then((result) => {
        // render
        const curListFr = result.data.data.friends;
        setListFriend(curListFr);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const navigate = (userId) =>
    navigation.navigate(stacks.profile.name, {
      userId: userId,
    });

  if (listFriend.length == 0) {
    return <Empty title="No friends yet" />;
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {listFriend.map((friend) => (
            <ProfileItem
              // avatar={friend.avatar.filename}
              key={friend._id}
              avatar={friend.avatar}
              userId={friend._id}
              title={friend.username}
              displayButtonAdvance={true}
              navigate={navigate}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems:'center',
    // justifyContent:'center'
  },
});

export default ListFriend;
