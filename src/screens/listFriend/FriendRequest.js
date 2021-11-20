import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView } from 'react-native';
import ProfileItem from '../../components/account/ProfileItem.jsx'
import { friend } from '../../apis';

const FriendRequest = () =>{

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im54dHVuZyIsImlkIjoiNjE4ZDJiNzQzNjhhZDgzYTk4YzgyMGMwIiwiaWF0IjoxNjM2NzI4NTc2fQ.ZowtOOrPquHHRWKLL_l8fAWdnP1q0Qde8JkiiOsNpu0";

    // API getListFriendRequest
    const [listFriendRequests, setListFriendRequest] = useState([]);
    useEffect(() => { 
        friend.getListFriendRequests(token)
        .then(result => {
            // console.log(result.data);
            const curRequest = result.data.data.friends;
            setListFriendRequest(curRequest);
        })
        .catch(error => {
            console.log(error);
        })
    }, [])


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
                buttonAccept: 'accept',
                buttonDelete: 'delete'
              }}
              displayDescription={true}
              time={request.createdAt}
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