import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { stacks } from '../constants/title';

const Home = ({navigation}) => {
  return(
    <View style = {styles.container}>
      <Button
        title = "Sign In"
        onPress = {() => navigation.navigate(stacks.signIn.name)}
      />
      <Button
        title = "Sign Up"
        onPress = {() => navigation.navigate(stacks.signUp.name)}
      />
      <Button
        title = "Change Password"
        onPress = {() => navigation.navigate(stacks.changePW.name)}
      />
      <Button
        title = "Advance"
        onPress = {() => navigation.navigate(stacks.advance.name)}
      />
      <Button
        title = "Notification"
        onPress = {() => navigation.navigate(stacks.notification.name)}
      />
      <Button
        title = "Personal Information"
        onPress = {() => navigation.navigate(stacks.personalInformation.name)}
      />
      <Button
        title = "List Friend"
        onPress = {() => navigation.navigate(stacks.listFriend.name)}
      />
      <Button
        title = "List Friend Request"
        onPress = {() => navigation.navigate(stacks.friendRequest.name)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{

  },
})

export default Home;