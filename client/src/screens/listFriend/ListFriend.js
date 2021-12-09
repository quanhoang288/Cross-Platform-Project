import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView } from 'react-native';
import ProfileItem from '../../components/account/ProfileItem.jsx';
import { friend } from '../../apis';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';


const ListFriend = () =>{
    // user 
    const user = useSelector(state => state.auth.user);
    

    const route = useRoute();
    const [userId, setUserId] = useState(null);
    if(route.params.userId !== user.id) setUserId(route.params.userId);

    // API getListFriend
    const [listFriend, setListFriend] = useState([]);
    useEffect(() => {
        friend.getListFriends(userId, user.token)
        .then(result => {
            
            // render
            const curListFr = result.data.data.friends;
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
              userId={friend._id}
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