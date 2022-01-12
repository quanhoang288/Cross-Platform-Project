import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-native-elements';
import { View, StyleSheet, StatusBar } from 'react-native';
import { InputText } from '../../components/block';
import { useNavigation, useRoute } from '@react-navigation/core';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/dimensions'; 
import { errorMessages } from '../../constants/message';
import { useDispatch, useSelector } from 'react-redux';
import { registerActions } from '../../redux/actions';
import { auth } from '../../apis';
import { stacks } from '../../constants/title';
import Toast from 'react-native-root-toast';
import {API_URL} from '../../configs';
import { showFailureMessage } from '../../helpers/Toast';
const SignUp = () => {
  const navigation = useNavigation();
  const route = useRoute();


  const dispatch = useDispatch();

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
  });

  const [isSignUpButtonClicked, setSignUpButtonClicked] = useState(false);
  const registerState = useSelector(state => state.register);

  useEffect(() => {
    if (route.name === stacks.signUp.name) {
      dispatch(registerActions.resetState());
    }
  }, [route]);

  useEffect(() => {
    if (registerState.error) {

      if (Platform.OS === 'web') {
        window.alert(registerState.error.message);
      } else {
        showFailureMessage(registerState.error.message);
      }
      
      dispatch(registerActions.resetState());
  
    }
  }, [registerState])


  const isValidUserName = (val) => {
    return val != '';
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
    const checkPhone = isValidPhoneNumber(data.phoneNumber);
    const checkPassword = isValidPassword(data.password);
    const checkConfirmPassword = isValidConfirmPassword(data.confirmPassword);

    // console.log(checkUserName);

    setErrors({
      ...errors,
      userName: checkUserName ? null : errorMessages.invalidUserName,
      phoneNumber: checkPhone ? null : errorMessages.invalidPhoneNumber,
      password: checkPassword ? null : errorMessages.invalidPassword,
      confirmPassword: checkConfirmPassword ? null : errorMessages.invalidConfirmPassword
    });
    return checkUserName && checkPassword && checkConfirmPassword && checkPhone;
  }

  const handleSignUp = () =>{
    if (!isSignUpButtonClicked) setSignUpButtonClicked(true);

    if(isValidInput(credentials)) {
      const data = {
        username: credentials.userName,
        phonenumber: credentials.phoneNumber,
        password: credentials.password,
      }
      register(data);
    }

  }

  const register = (data) => {
    const {
        phonenumber,
        username,
        password
    } = data;
    
    dispatch(registerActions.registerRequest());
    console.log(API_URL);
    auth.register(phonenumber, username, password)
        .then(user => {
            // console.log(user);
            dispatch(registerActions.registerSuccess());
            navigation.navigate(stacks.signIn.name);
        })
        .catch(error => {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              dispatch(registerActions.registerFailure(error.response.data));
            }
        });
    
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
        keyboardType="number-pad"
        errorMessage={errors.phoneNumber}
        value={credentials.phoneNumber}
        handleTextChange={handleTextChange}
      />

      <InputText 
        name="password"
        label="Password"
        isPassword={true}
        leftIcon={{
          name:"lock",
          type:"feather"
        }}
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
        isPassword={true}
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
        onPress={handleSignUp}
        loading={registerState.registering}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'rgb(255, 255, 255)',
    alignItems:'center',
    flex: 1,
    // height: DEVICE_HEIGHT,
    // justifyContent:'center',
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