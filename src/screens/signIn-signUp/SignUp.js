import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-native-elements';
import { View, StyleSheet, StatusBar } from 'react-native';
import { InputText } from '../../components/block';
import { useNavigation } from '@react-navigation/core';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/dimensions'; 
import { errorMessages } from '../../constants/message';

const SignUp = () =>{
  const navigation = useNavigation();

  const [credentials, setCredential] = useState({
    userName: "",
    phoneNumber: "", 
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    userName: null,
    phoneNumber: null, 
    password: null,
    confirmPassword: null,
  })

  const [isSignUpButtonClicked, setSignUpButtonClicked] = useState(false);

  const isValidUserName = (val) => {
    return isSignUpButtonClicked ? (val!= "") : (val != null);
  }

  const isValidPhoneNumber = (val) => {
    const reg = /^[0]\d{9}$/;
    return reg.test(val);
  }

  const isValidPassword = (val) => {
    return val.trim().length >= 6;
  }

  const isValidConfirmPassword = (val) => {
    return val === credentials.password;
  }

  const handleTextChange = (name, val) => {
    setCredential({
      ...credentials,
      [name]: val,
    })
    if (isSignUpButtonClicked){
      if (name === "userName"){
        setErrors({
          ...errors,
          userName: isValidUserName(val) ? null : errorMessages.invalidUserName,
        })
      }
      else if (name === "phoneNumber"){
        setErrors({
          ...errors,
          phoneNumber: isValidPhoneNumber(val) ? null : errorMessages.invalidPhoneNumber,
        })
      }
      else if (name === "password"){
        setErrors({
          ...errors,
          password: isValidPassword(val) ? null : errorMessages.invalidPassword,
        })
      }
      else {
        setErrors({
          ...errors,
          confirmPassword: isValidConfirmPassword(val) ? null : errorMessages.invalidConfirmPassword,
        })
      }
    }
  }

  const isValidInput = (data) => {
    // update state
    const checkUserName = isValidUserName(data.userName);
    const checkPhone = isValidPhoneNumber(data.phonenumber);
    const checkPassword = isValidPassword(data.password);
    const checkConfirmPassword = isValidConfirmPassword(data.confirmPassword);

    setErrors({
      ...errors,
      userName: checkUserName ? null : errorMessages.invalidUserName,
      phoneNumber: checkPhone ? null : errorMessages.invalidPhoneNumber,
      password: checkPassword ? null : errorMessages.invalidPassword,
      confirmPassword: checkConfirmPassword ? null : errorMessages.invalidConfirmPassword
    });
  }

  const handleSignUp = () =>{
    if (!isSignUpButtonClicked) setSignUpButtonClicked(true);

    const data = {
      username: credentials.userName,
      phonenumber: credentials.phoneNumber,
      password: credentials.password,
    }
    if(isValidInput(data)) {
      // call API
      // navigation.navigate('Tabs');
    }
  }

  return(
    <View style={styles.container}>
      <InputText
        name="userName"
        label="User Name"
        leftIcon={{
          name:"user",
          type:"feather"
        }}
        placeholderText={"John Parkour"}
        errorMessage={errors.userName}
        value={credentials.userName}
        handleTextChange={handleTextChange}
        
      />

      <InputText 
        name="phoneNumber"
        label="Phone Number"
        leftIcon={{
          name:"phone",
          type:"antdesign"
        }}
        placeholderText={"09xx.xxx.xxx"}
        errorMessage={errors.phoneNumber}
        value={credentials.phoneNumber}
        handleTextChange={handleTextChange}
      />

      <InputText 
        name="password"
        label="Password"
        leftIcon={{
          name:"lock",
          type:"feather"
        }}
        placeholderText={"********"}
        rightIcon={{
          name:"eye-off",
          type:"feather"
        }}
        secureTextEntry={true}
        errorMessage={errors.password}
        value={credentials.password}
        handleTextChange={handleTextChange}
      />

      <InputText 
        name="confirmPassword"
        label="Confirm Password"
        leftIcon={{
          name:"lock",
          type:"feather"
        }}
        placeholderText={"********"}
        rightIcon={{
          name:"eye-off",
          type:"feather"
        }}
        secureTextEntry={true}
        errorMessage={errors.confirmPassword}
        value={credentials.confirmPassword}
        handleTextChange={handleTextChange}
      />

      <Button
        title="Sign Up"
        loading={false}
        loadingProps={styles.loadingProps}
        titleStyle={styles.titleStyle}
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.containerStyle}
        // onPress={() => {
        //   navigation.navigate('Tabs');
        // }}
        onPress = {handleSignUp}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'rgb(255, 255, 255)',
    alignItems:'center',
    // justifyContent:'center',
    flex: 1,
    height: DEVICE_HEIGHT,
    // marginTop: StatusBar.currentHeight,
  },

  loadingProps:{

    color: 'white'
  },
  titleStyle:{
    fontWeight: 'bold',
    fontSize: 24
  },
  buttonStyle:{
    backgroundColor: 'rgb(0, 102, 255)',
    borderRadius: 8,
  },
  containerStyle:{
    marginVertical: 12,
    justifyContent: 'center',
    height:50,
    width:200
  },
})


export default SignUp;