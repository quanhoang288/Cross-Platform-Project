import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView } from 'react-native';
import ProfileItem from '../../components/account/ProfileItem.jsx'
import { friend } from '../../apis';
import { useSelector } from 'react-redux';

const FriendRequest = () =>{

    // user
    const user = useSelector(state => state.auth.user);

    // API getListFriendRequest
    const [listFriendRequests, setListFriendRequest] = useState([]);
    useEffect(() => { 
        friend.getListFriendRequests(user.token)
        .then(result => {
            // render
            const curRequest = result.data.data.friends;
            setListFriendRequest(curRequest);
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    // API respond request
    const acceptRequest = (userId, is_accept) => {
        friend.acceptFriendRequest(userId, is_accept, user.token)
        .then(result => {
            // notice:

            // render
            const resultRequest = listFriendRequests.filter(item => item._id !== result.data.data.sender);
            setListFriendRequest(resultRequest)
        })
        .catch(error => {
            console.log(error)
        })
    }

  return(
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {listFriendRequests.map(request => (
            <ProfileItem
              key={request._id}
              avatar={{
                source:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWx8bMzJMOdeGAEPuEkV3SVhHS6LwUaxVpCy7f3D95lDl8WVRlOewHb3_2QwnNUbPJFDY&usqp=CAU",
              }}
              title={request.username}
              displayButtonGroup={true}
              button={{
                userId: request._id,
                buttonAccept: 'accept',
                buttonDelete: 'delete'
              }}
              displayDescription={true}
              time={request.createdAt}
              acceptRequest={acceptRequest}
            />
          ))}
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    // alignItems:'center',
    // justifyContent:'center'
  },
})


export default FriendRequest;