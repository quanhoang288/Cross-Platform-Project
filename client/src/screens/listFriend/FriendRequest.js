import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import ProfileItem from '../../components/account/ProfileItem.jsx';
import { friend } from '../../apis';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { stacks } from '../../constants/title.js';
import formatDate from '../../helpers/DateFormater.js';
import { ASSET_API_URL } from '../../configs';

const FriendRequest = () => {
  // user
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();

  const [listFriendRequests, setListFriendRequest] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFriendRequestList = async (token) => {
    try {
      const result = await friend.getListFriendRequests(token);
      setListFriendRequest(result.data.data.friends);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = useCallback(async () => {
    await fetchFriendRequestList(user.token);
    setRefreshing(false);
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchFriendRequestList(user.token);
    }
  }, [user]);

  useEffect(() => {
    if (refreshing) {
      handleRefresh();
    }
  }, [refreshing]);

  const navigate = (userId) =>
    navigation.navigate(stacks.profile.name, {
      userId: userId,
    });

  // API respond request
  const acceptRequest = (userId, is_accept) => {
    friend
      .acceptFriendRequest(userId, is_accept, user.token)
      .then((result) => {
        // notice:

        // render
        const resultRequest = listFriendRequests.filter(
          (item) => item._id !== result.data.data.sender,
        );
        setListFriendRequest(resultRequest);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {listFriendRequests.map((request) => (
          <ProfileItem
            key={request._id}
            avatar={{
              source: `${ASSET_API_URL}/${request.avatar.fileName}`,
            }}
            title={request.username}
            displayButtonGroup={true}
            button={{
              userId: request._id,
              buttonAccept: 'accept',
              buttonDelete: 'delete',
            }}
            displayDescription={true}
            time={formatDate(request.updatedAt)}
            acceptRequest={acceptRequest}
            userId={request._id}
            navigate={navigate}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems:'center',
    // justifyContent:'center'
  },
});

export default FriendRequest;
