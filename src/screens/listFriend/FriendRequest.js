import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import ProfileItem from '../../components/account/ProfileItem.jsx'

const FriendRequest = () =>{
  return(
    <View style={styles.container}>
      <ProfileItem
        avatar={{
          source:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWx8bMzJMOdeGAEPuEkV3SVhHS6LwUaxVpCy7f3D95lDl8WVRlOewHb3_2QwnNUbPJFDY&usqp=CAU",
        }}
        title='QuanHH'
        displayButtonGroup={true}
        button={{
          buttonAccept: 'accept',
          buttonDelete: 'delete'
        }}
        displayDescription={true}
        time = "1d"
      />
      <ProfileItem
        avatar={{
          source:"https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-chibi-buon.jpg",
        }}
        title='NXTung'
        displayButtonGroup={true}
        button={{
          buttonAccept: 'accept',
          buttonDelete: 'delete'
        }}
        displayDescription={true}
        time = "1w"
      />

      <ProfileItem
        avatar={{
          source:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7vFTlbgSjNtZgYf3JdY6F7qW4wE_FR2ONaw&usqp=CAU",
        }}
        title='TrungVH'
        displayButtonGroup={true}
        button={{
          buttonAccept: 'accept',
          buttonDelete: 'delete'
        }}
        displayDescription={true}
        time = "3w"
      />

      <ProfileItem
        avatar={{
          source:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf5pUFWedzehaMYG74PAWQ3shRdtygnHDfNg&usqp=CAU",
        }}
        title='A Girl'
        displayButtonGroup={true}
        button={{
          buttonAccept: 'accept',
          buttonDelete: 'delete'
        }}
        displayDescription={true}
        time = "2m"
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


export default FriendRequest;