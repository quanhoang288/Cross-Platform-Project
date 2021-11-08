import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Text } from 'react-native-elements';
import { View, StyleSheet, StatusBar } from 'react-native';
import { InputText } from '../../components/block';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/dimensions'; 
import { stacks } from '../../constants/title';
import { errorMessages } from '../../constants/message';
import { useNavigation } from '@react-navigation/core';


const SignIn = () =>{
  const navigation = useNavigation();

  // 
  const [credentials, setCredential] = useState({phoneNumber: "", password: "" });
  const [errors, setErrors] = useState({phoneNumber: null, password: null })

  const [isSignInButtonClicked, setSignInButtonClicked] = useState(false);

  const isValidPassword = (val) => {
    return val.trim().length >= 6;
  }

  const isValidPhoneNumber = (val) => {
    const reg = /^[0]\d{9}$/;
    return reg.test(val);
  }

  const handleTextChange = (name, val) => {
    setCredential({
      ...credentials,
      [name]: val,
    })
    if (isSignInButtonClicked){
      if (name === "phoneNumber"){
        setErrors({
          ...errors,
          phoneNumber: isValidPhoneNumber(val) ? null : errorMessages.invalidPhoneNumber,
        })
      }
      else {
        setErrors({
          ...errors,
          password: isValidPassword(val) ? null : errorMessages.invalidPassword,
        })
      }
    }
  }

  const isValidInput = (data) => {
    // update state
    const checkPhone = isValidPhoneNumber(data.phonenumber);
    const checkPassword = isValidPassword(data.password);

    setErrors({
      ...errors,
      phoneNumber: checkPhone ? null : errorMessages.invalidPhoneNumber,
      password: checkPassword ? null : errorMessages.invalidPassword,
    });
  }

  const handleSignIn = () =>{
    if (!isSignInButtonClicked) setSignInButtonClicked(true);

    const data = {
      phonenumber: credentials.phoneNumber,
      password: credentials.password,
    }
    if(isValidInput(data)) {
      // call API
      // navigation.navigate('Tabs');
    }
  }

  return(
    <View style={styles.container} >
      <Image
        source={require('../../../assets/favicon.png')}
        style={{
          width: DEVICE_WIDTH*7/10,
          height: DEVICE_HEIGHT*3/5,
          minHeight: 100,
          minWidth: 100,
          maxHeight: 200,
          maxWidth: 200,
          margin: 16,
        }}
        containerStyle={{
          // marginVertical: '15%',
          // marginHorizontal: '20%',
        }}
      />
      <InputText 
        name="phoneNumber"
        leftIcon={{
          name:"phone",
          type:"antdesign"
        }}
        placeholderText={"Phone number"}
        // rightIcon={true}
        errorMessage={errors.phoneNumber}
        value={credentials.phoneNumber}
        handleTextChange={handleTextChange}
      />

      <InputText 
        name="password"
        leftIcon={{
          name:"lock",
          type:"feather"
        }}
        placeholderText={"Password"}
        secureTextEntry={true}
        // rightIcon={true}
        errorMessage={errors.password}
        value={credentials.password}
        handleTextChange={handleTextChange}
      />

      <Button
        title="Sign In"
        loading={false}
        loadingProps={{color: 'white'}}
        titleStyle={{
          fontWeight: 'bold',
          fontSize: 24
        }}
        buttonStyle={{backgroundColor: 'rgb(0, 102, 255)', borderRadius: 8,}}
        containerStyle={{
          marginBottom: 12,
          marginTop: 20,
          justifyContent: 'center',
          height:50,
          width:200
        }}

        onPress={handleSignIn}
      />

      <Text >Dont' have an account ?</Text>

      <Button
        title="Sign Up"
        loading={false}
        loadingProps={{color: 'blue'}}
        titleStyle={{
          fontWeight: 'bold',
          fontSize: 20,
          color: 'rgb(0, 102, 255)'
        }}
        buttonStyle={{backgroundColor: 'rgba(0, 0, 0, 0)', borderRadius: 8,}}
        containerStyle={{
          marginBottom:12,
          justifyContent: 'center',
        }}
        onPress={() => {
          navigation.navigate(stacks.signUp.name);
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    // justifyContent:'center',
    backgroundColor: 'rgb(255, 255, 255)',
    flex: 1,
    height: DEVICE_HEIGHT,
    marginTop: StatusBar.currentHeight,
    paddingTop: DEVICE_HEIGHT/12,
  },
})


export default SignIn;