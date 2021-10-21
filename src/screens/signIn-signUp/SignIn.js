import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { InputText } from '../../components/block';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/dimensions'; 

const SignIn = () =>{
  const [credentials, setCredential] = useState({name:"", password:""});
  const handleChange = (name, value) => {setCredential({...credentials, [name]:value })} 

  return(
    <View style={styles.container}>
      <Image
        source={require('../../../assets/favicon.png')}
        style={{
          width: DEVICE_WIDTH*7/10,
          height: DEVICE_HEIGHT*3/5,
          minHeight: 100,
          minWidth: 100,
          maxHeight: 200,
          maxWidth: 200,
        }}
        containerStyle={{
          marginVertical: '15%',
          marginHorizontal: '20%',
        }}
      />
      <InputText 
        name="phone"
        handleChange={handleChange}
        icon={{

        name:"phone",
        type:"antdesign"
      }}
      placeholderText={"Phone number"}
      />

      <InputText 
        name="password"
        handleChange={handleChange}
        icon={{
        name:"lock",
        type:"feather"
      }}
      placeholderText={"Password"}
      />

      <Button
        title="Sign in"
        loading={false}
        loadingProps={styles.loadingProps}
        titleStyle={styles.titleStyle}
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.containerStyle}
        onPress={() => console.log('aye')}
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
    size: 'small',
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


export default SignIn;