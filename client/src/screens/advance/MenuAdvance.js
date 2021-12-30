import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { FunctionalityItem } from '../../components/block';
import { useNavigation } from '@react-navigation/core';
import { stacks } from '../../constants/title';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux/actions';

const MenuAdvance = () => {
  // user
  const user = useSelector(state => state.auth.user);
  // console.log(user);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(authActions.logout());
    navigation.navigate(stacks.signIn.name);
  }

  return(
    <View style={styles.container}>
      <FunctionalityItem
        icon={{
          name:'user',
          type:'feather'
        }}
        content="User profile"
        note="View your personal posts and images"
        onPress={() => navigation.navigate(stacks.profile.name, {
          userId: user.id,
        })}
      />

      <FunctionalityItem
        icon={{
          name:'user',
          type:'feather'
        }}
        content="Personal Information"
        note="Show your personal information"
        onPress={() => navigation.navigate(stacks.personalInformation.name)}
      />

      <FunctionalityItem
        icon={{
          name:'users',
          type:'feather'
        }}
        content="Friends"
        note="See your friends"
        onPress={() => navigation.navigate(stacks.friendTabs.name, {
          userId: user.id,
        })}

      />

      <FunctionalityItem
        icon={{
          name:'user-x',
          type:'feather'
        }}
        content="Black list"
        note="Person who you don't wanna see"
        onPress={() => navigation.navigate(stacks.friendRequest.name)}

      />

      <FunctionalityItem
        icon={{
          name:'exchange',
          type:'font-awesome'
        }}
        content="Change password"
        note=""
        onPress={() => navigation.navigate(stacks.changePW.name)}

      />

      <FunctionalityItem
        icon={{
          name:'help-circle',
          type:'feather'
        }}
        content="Help ?"
        note="Is there anything I can help for you?"
        onPress={() => navigation.navigate('help')}
      />

      <FunctionalityItem
        icon={{
          name:'log-out',
          type:'feather'
        }}
        content="Sign out"
        note=""
        onPress={handleSignOut}
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