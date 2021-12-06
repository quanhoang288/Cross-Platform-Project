import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { InputText } from '../../components/block';
import { errorMessages } from '../../constants/message';
import { auth } from '../../apis';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { stacks } from '../../constants/title';
// import { stacks } from '../constants/title';

const ChangePW = () =>{

    const navigation = useNavigation();
    //user
    const user = useSelector(state => state.auth.user);

    // information PW
    const [passwords, setPassword] = useState({
        curPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    //information errors
    const [errors, setErrors] = useState({
        curPassword: null,
        newPassword: null,
        confirmPassword: null,
    })

    const [isUpdateButtonClicked, setUpdateButtonClicked] = useState(false);

    const isValidCurPassword = (val) => {
        return val.trim().length >= 6;
    }

    const isValidNewPassword = (val) => {
        return val.trim().length >= 6;
    }

    const isValidConfirmPassword = (val) => {
        return val === passwords.newPassword;
    }

    const handleTextChange = (name, val) => {
        setPassword({
            ...passwords,
            [name]: val,
        })
        if (isUpdateButtonClicked){
            if(name === "curPassword"){
                setErrors({
                    ...errors,
                    curPassword: isValidCurPassword(val) ? null : errorMessages.invalidPassword,
                })
            }
            else if(name === "newPassword"){
                setErrors({
                    ...errors,
                    newPassword: isValidNewPassword(val) ? null : errorMessages.invalidPassword,
                })
            }
            else if(name === "confirmPassword"){
                setErrors({
                    ...errors,
                    confirmPassword: isValidConfirmPassword(val) ? null : errorMessages.invalidConfirmPassword,
                })
            }
        }
    }

    const isValidInput = (data) => {
        //update state
        const checkCur = isValidCurPassword(data.curPassword);
        const checkNew = isValidNewPassword(data.newPassword);
        const checkConfirm = isValidConfirmPassword(data.confirmPassword);
        setErrors({
            ...errors,
            curPassword: checkCur ? null : errorMessages.invalidPassword,
            newPassword: checkNew ? null : errorMessages.invalidPassword,
            confirmPassword: checkConfirm ? null : errorMessages.invalidConfirmPassword,
        });

        return checkCur && checkNew && checkConfirm;
    }

    const handleUpdate = () => {
        if (!isUpdateButtonClicked) setUpdateButtonClicked(true);

        if(isValidInput(passwords)){
            const data = {
                currentPassword: passwords.curPassword,
                newPassword: passwords.newPassword,
            }

            update(data);
        }
    }

    const update = (data) => {
        const {
            currentPassword,
            newPassword,
        } = data;

        auth.changePassword(currentPassword, newPassword, user.token)
        .then(result => {
            navigation.navigate('PersonalStack');
        })
        .catch(error => {
            console.log(error);
        })
    }

  return(
    <View style={styles.container}>
      <InputText
        name="curPassword"
        label={"Current password"}
        placeholderText={"Enter current password"}
        secureTextEntry={true}
        value={passwords.curPassword}
        errorMessage={errors.curPassword}
        handleTextChange={handleTextChange}
      />

      <InputText
        name="newPassword"
        label={"New password"} 
        placeholderText={"Enter new password"}
        secureTextEntry={true}
        value={passwords.newPassword}
        errorMessage={errors.newPassword}
        handleTextChange={handleTextChange}
      />

      <InputText
        name="confirmPassword" 
        placeholderText={"Confirm new Password"}
        secureTextEntry={true}
        value={passwords.confirmPassword}
        errorMessage={errors.confirmPassword}
        handleTextChange={handleTextChange}
      />

      <Button
        title="Update"
        loading={false}
        loadingProps={styles.loadingProps}
        titleStyle={styles.titleStyle}
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.containerStyle}
        onPress={handleUpdate}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent:'center'
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


export default ChangePW;