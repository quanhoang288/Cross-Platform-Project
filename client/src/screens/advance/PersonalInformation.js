import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'react-native-elements';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { DatePicker, InputText } from '../../components/block';
import { errorMessages } from '../../constants/message';
import { auth } from '../../apis';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { showFailureMessage, showSuccessMessage } from '../../helpers/Toast';


const personalInformation = () =>{

    const navigation = useNavigation();
    //user
    const user = useSelector(state => state.auth.user);
    
    // data
    const [userInfo, setUserInfo] = useState({
        username: "",
        gender: null,
        birthday: null,
        address: "",
    });

    const getUserInfo = async () => {
        try {
            const result = await auth.showInfo(null, user.token);
            const curUserInfo = result.data.data;
            // console.log(curUserInfo);
            setUserInfo({
                username: curUserInfo.username,
                gender: curUserInfo.gender,
                birthday: curUserInfo.birthday,
                address: curUserInfo.address,
            });
            console.log(userInfo);
        } 
        catch (err) {
            console.log(err);
        }
    };
    
    useEffect(() => {
        console.log("getting userInfo");
        getUserInfo();
    }, []);

    //errors
    const [errors, setErrors] = useState({
        username: null,
        gender: null,
        birthday: null,
        address: null,
    });

    const [isChangeButtonClicked, setIsChangeButtonClicked] = useState(false);

    // validate userName
    const isValidUserName = (val) => {
        return val != '';
    }

    const handleTextChange = (name, val) => {
        setUserInfo({
            ...userInfo,
            [name]: val,
        })
        if (isChangeButtonClicked){
            if (name === "username"){
                setErrors({
                  ...errors,
                  username: isValidUserName(val) ? null : errorMessages.invalidUserName,
                })
            }
        }
    }

    const isValidInput = (data) => {
        // update state
        const checkUserName = isValidUserName(data.username);

        setErrors({
            ...errors,
            username: checkUserName ? null : errorMessages.invalidUserName,
        });
        return checkUserName;
    }

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
      // console.log("A date has been picked: ", date);
      const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
      setUserInfo({
        ...userInfo,
        birthday: `${day}/${month+1}/${year}`,
      })
      hideDatePicker();
    };

    const handleChange = () =>{
      if (!isChangeButtonClicked) setIsChangeButtonClicked(true);

      if(isValidInput(userInfo)) {
          console.log(userInfo);
          change(userInfo);
      }
    }

    const change = (data) => {
        auth.editInfo(data, user.token)
        .then(result => {
            showSuccessMessage("Change personal information successfully")
            console.log(result.data);
            // navigation.navigate('PersonalStack');
        })
        .catch(error => {
            showFailureMessage("Change personal information unsuccessfully")
            console.log(error);
        })
    }


  return(
    <View style={styles.container}>
      <InputText 
        label={'User Name:'}
        name="username"
        value={userInfo.username}
        errorMessage={errors.username}
        handleTextChange={handleTextChange}
      />

      <View style={styles.btn}>
        <Text style={{fontSize:18, fontWeight:"600"}}>Gender: </Text>
        <View style={styles.btn}>
          <TouchableOpacity 
            style={styles.btn}
            onPress={() => setUserInfo({...userInfo, gender: "male"})}
          >
            <Icon
              name="radio-button-on"
              type="ionicon"
              color={ userInfo.gender !== "male"? "rgb(150, 150, 150)" :"rgb(51, 51, 255)"}
            />
            <Text>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {setUserInfo({...userInfo, gender: "female"});}}
            style={styles.btn}>
            <Icon
              name="radio-button-on"
              type="ionicon"
              color={ userInfo.gender !== "female"? "rgb(150, 150, 150)" :"rgb(51, 51, 255)"}
            />
            <Text>Female</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DatePicker
        title="Birthday: "
        content={userInfo.birthday}
        handlePress={showDatePicker}
        isDatePickerVisible={isDatePickerVisible}
        handleConfirm={handleConfirm}
        hideDatePicker={hideDatePicker}
      />

      <InputText 
        label={'Address:'}
        name="address"
        value={userInfo.address}
        errorMessage={errors.address}
        handleTextChange={handleTextChange}
      />

      <View style = {{alignItems:'center',}}>
        <Button
          title="Change"
          loading={false}
          loadingProps={styles.loadingProps}
          titleStyle={styles.titleStyle}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.containerStyle}
          onPress={handleChange}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    // alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'rgb(255, 255, 255)',
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
  btn:{
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10
  },
})


export default personalInformation;