import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Text } from 'react-native-elements';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { InputText } from '../../components/block';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/dimensions'; 
import { stacks } from '../../constants/title';
import { errorMessages } from '../../constants/message';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux/actions';
import { auth } from '../../apis';
import { Toast } from '../../helpers';

const SignIn = () =>{
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const register = useSelector(state => state.register);
  const authState = useSelector(state => state.auth);

  const passwordRef = useRef();

  useEffect(() => {
    if (register.registered && route.name === stacks.signIn.name) {

      if (Platform.OS === 'web') {
        window.alert('Registered successfully!');
      } else {
        Toast.showSucessMessage('Registered successfully!');
      }
    }
  }, [register]);

  useEffect(() => {
    if (authState.error && route.name === stacks.signIn.name) {
      if (Platform.OS === 'web') {
        window.alert(authState.error.message);
      } else {
        Toast.showFailureMessage(authState.error.message);
      }
      
      dispatch(authActions.resetState());
    }
  }, [authState]);


  
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
    return checkPhone && checkPassword;
  }

  const handleSignIn = () =>{
    if (!isSignInButtonClicked) setSignInButtonClicked(true);

    const data = {
      phonenumber: credentials.phoneNumber,
      password: credentials.password,
    }
    if(isValidInput(data)) {
      login(data);
    }
  }

  const login = (data) => {

    const {phonenumber, password} = data;
    
    dispatch(authActions.loginRequest());

    auth.login(phonenumber, password)
        .then(userInfo => {
            const user = {
                ...userInfo.data.data,
                token: userInfo.data.token
            }
            dispatch(authActions.loginSuccess(user));
            navigation.navigate('Tabs');
        })
        .catch(error => {
            if (error.response) {
              dispatch(authActions.loginFailure(error.response.data));
            }
        });
}

  return(
    <View style={styles.container} >
      <Image
        source={require('../../../assets/favicon.png')}
        style={{
          width: DEVICE_WIDTH*7/10,
          height: DEVICE_HEIGHT/5,
          minHeight: 100,
          minWidth: 100,
          maxHeight: 200,
          maxWidth: 200,
          resizeMode: 'contain'
        }}
        containerStyle={{
          marginBottom: 20
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
        loading={authState.loggingIn}
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