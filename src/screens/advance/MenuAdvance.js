import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { FunctionalityItem } from '../../components/block';

const MenuAdvance = () =>{
  return(
    <View style={styles.container}>
      <FunctionalityItem
        icon={{
          name:'user',
          type:'feather'
        }}
        content="Personal Information"
        note="Show your personal information"
      />

      <FunctionalityItem
        icon={{
          name:'users',
          type:'feather'
        }}
        content="Friends"
        note="See your friends"
      />

      <FunctionalityItem
        icon={{
          name:'user-x',
          type:'feather'
        }}
        content="Black list"
        note="Person who you don't wanna see"
      />

      <FunctionalityItem
        icon={{
          name:'exchange',
          type:'font-awesome'
        }}
        content="Change password"
        note=""
      />

      <FunctionalityItem
        icon={{
          name:'help-circle',
          type:'feather'
        }}
        content="Help ?"
        note="Is there anything I can help for you?"
      />

      <FunctionalityItem
        icon={{
          name:'log-out',
          type:'feather'
        }}
        content="Sign out"
        note=""
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


export default MenuAdvance;