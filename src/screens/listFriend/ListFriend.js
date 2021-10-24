import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import ProfileItem from '../../components/account/ProfileItem.jsx'

const ListFriend = () =>{
  return(
    <View style={styles.container}>
      <ProfileItem
        avatar={{
          source:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWx8bMzJMOdeGAEPuEkV3SVhHS6LwUaxVpCy7f3D95lDl8WVRlOewHb3_2QwnNUbPJFDY&usqp=CAU",
        }}
        displayButtonAdvance={true}
        title='QuanHH'
      />
      <ProfileItem
        avatar={{
          source:"https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-chibi-buon.jpg",
        }}
        displayButtonAdvance={true}
        title='NXTung'
      />

      <ProfileItem
        avatar={{
          source:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7vFTlbgSjNtZgYf3JdY6F7qW4wE_FR2ONaw&usqp=CAU",
        }}
        displayButtonAdvance={true}
        title='TrungVH'
      />

      <ProfileItem
        avatar={{
          source:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf5pUFWedzehaMYG74PAWQ3shRdtygnHDfNg&usqp=CAU",
        }}
        displayButtonAdvance={true}
        title='A Girl'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    // alignItems:'center',
    // justifyContent:'center'
  },
})


export default ListFriend;