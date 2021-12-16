import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Icon, ListItem } from 'react-native-elements';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import { DatePicker, InputText } from '../../components/block';
import { errorMessages } from '../../constants/message';
import { auth } from '../../apis';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { showFailureMessage, showSuccessMessage } from '../../helpers/Toast';
import { DEVICE_WIDTH } from "../../constants/dimensions";

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

    const getDate = (value) => {
      let result = "";
      let date = new Date(value);
      result += `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `;
      return result;
    };

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
      setUserInfo({
        ...userInfo,
        birthday: date
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
    <ScrollView style={styles.container}>
      <View style={styles.margin}>
        <View style={styles.formText}>
          <Text style={styles.labelText}>Avatar : </Text>
          <Text
            style={styles.editText}
            onPress={() => console.log("Edit Avt")}
          >  Edit  </Text>
        </View>
        <View style={{alignItems:'center'}}>
          <Avatar
            rounded
            size={120}
            source={{
              // uri: `${ASSET_API_URL}/${userData.info.avatar.fileName}`,
              uri: "https://i.etsystatic.com/29282700/r/il/e3aae5/3152845862/il_340x270.3152845862_q44u.jpg",
            }}
            onPress={() => console.log("Pressed on avatar!")}
          />
        </View>
      </View>

      <View style={styles.margin}>
        <View style={styles.formText}>
          <Text style={styles.labelText}>Image background : </Text>
          <Text 
            style={styles.editText}
            onPress={() => console.log("Edit Avt")}
          >  Edit  </Text>
        </View>
        <View style={{alignItems:'center',}}>
          <ImageBackground
            source={{
              uri: "https://mondaycareer.com/wp-content/uploads/2020/11/background-%C4%91%E1%BA%B9p-2-1024x585.jpg",
            }}
            alt='This is cover image'
            style={styles.imageCover}
          />
        </View>
      </View> 

      <View style={styles.margin}>
        <Text style={styles.labelText}>User Name:</Text>
        <InputText 
          name="username"
          value={userInfo.username}
          errorMessage={errors.username}
          handleTextChange={handleTextChange}
        />
      </View>

      <View style={{flexDirection: 'row', marginHorizontal: 10, marginBottom: 16}}>
        <Text style={styles.labelText}>Gender: </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity 
            style={styles.btn}
            onPress={() => setUserInfo({...userInfo, gender: "male"})}
          >
            <Icon
              name="radio-button-on"
              type="ionicon"
              color={ userInfo.gender !== "male"? "rgb(150, 150, 150)" :"rgb(51, 51, 255)"}
            />
            <Text style={{fontSize: 20}}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {setUserInfo({...userInfo, gender: "female"});}}
            style={styles.btn}>
            <Icon
              name="radio-button-on"
              type="ionicon"
              color={ userInfo.gender !== "female"? "rgb(150, 150, 150)" :"rgb(51, 51, 255)"}
            />
            <Text style={{fontSize: 20}}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DatePicker
        title="Birthday: "
        content={getDate(userInfo.birthday)}
        handlePress={showDatePicker}
        isDatePickerVisible={isDatePickerVisible}
        handleConfirm={handleConfirm}
        hideDatePicker={hideDatePicker}
      />


      <View style={styles.margin}>
        <Text style={styles.labelText}>Address:</Text>
        <InputText 
          name="address"
          value={userInfo.address}
          errorMessage={errors.address}
          handleTextChange={handleTextChange}
        />
      </View>

      <View style = {{alignItems:'center',}}>
        <Button
          title="Change"
          loading={false}
          loadingProps={styles.loadingProps}
          titleStyle={styles.titleButtonStyle}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.containerStyle}
          onPress={handleChange}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    // alignItems:'center',
    // justifyContent:'center',
    backgroundColor: 'rgb(255, 255, 255)',
    paddingTop: 10
  },

  formText:{
    flexDirection:"row", 
    justifyContent: "space-between"
  },

  margin: {
    marginHorizontal: 10, 
    marginBottom: 16
  },

  labelText:{
    fontSize: 20, 
    fontWeight: "bold",
  },

  editText:{
    color: "blue",
    fontSize: 16, 
    fontWeight:"200",
    marginRight: 10
  },

  imageCover: {
    marginTop: 24,
    marginBottom: 8,
    width: DEVICE_WIDTH*0.9,
    height: 150,
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 2,
  },

  loadingProps:{
    color: 'white'
  },
  titleButtonStyle:{
    fontWeight: 'bold',
    fontSize: 24
  },
  buttonStyle:{
    backgroundColor: 'rgb(0, 102, 255)',
    borderRadius: 8,
  },
  containerStyle:{
    marginBottom: 40,
    justifyContent: 'center',
    height:50,
    width:200
  },
  btn:{
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
})


export default personalInformation;