import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { FunctionalityItem } from '../../components/block';

const Notification = () =>{
  return(
    <View style={styles.container}>
      <FunctionalityItem
        icon={{
          name:'user-secret',
          type:'fontisto'
        }}
        content="FBI hacked your account"
        note="2 hours ago"
      />

      <FunctionalityItem
        icon={{
          name:'user-secret',
          type:'fontisto'
        }}
        content="FBI commented on your status"
        note="yesterday"
      />

      <FunctionalityItem
        icon={{
          name:'user-secret',
          type:'fontisto'
        }}
        content="FBI liked your profile picture"
        note="3 days ago"
      />

      <FunctionalityItem
        icon={{
          name:'user-secret',
          type:'fontisto'
        }}
        content="FBI sent you a friend request"
        note="last week"
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


export default Notification;