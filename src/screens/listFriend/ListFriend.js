import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView } from 'react-native';
import ProfileItem from '../../components/account/ProfileItem.jsx'
import { friend } from '../../apis';


const ListFriend = () =>{

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im54dHVuZyIsImlkIjoiNjE4ZDJiNzQzNjhhZDgzYTk4YzgyMGMwIiwiaWF0IjoxNjM2NzI4NTc2fQ.ZowtOOrPquHHRWKLL_l8fAWdnP1q0Qde8JkiiOsNpu0";

    // API getListFriend
    const [listFriend, setListFriend] = useState([]);
    useEffect(() => {
        friend.getListFriends(null, token)
        .then(result => {
            const curListFr = result.data.data.friends;
            // console.log(curListFr);
            setListFriend(curListFr);
        })
        .catch(error => {
          console.log(error);
        })
    }, [])

  return(
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {listFriend.map( friend => (
            <ProfileItem
              // avatar={friend.avatar.filename}
              key={friend._id} 
              avatar={{
                source:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWx8bMzJMOdeGAEPuEkV3SVhHS6LwUaxVpCy7f3D95lDl8WVRlOewHb3_2QwnNUbPJFDY&usqp=CAU",
              }}
              title={friend.username}
              displayButtonAdvance={true}
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


export default ListFriend;