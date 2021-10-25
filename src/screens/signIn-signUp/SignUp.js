import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { InputText } from '../../components/block';

const SignUp = () =>{
  return(
    <View style={styles.container}>
      <InputText 
        label="User Name"
        icon={{
          name:"user",
          type:"feather"
        }}
        placeholderText={"John Parkour"}
      />

      <InputText 
        label="Phone Number"
        icon={{
          name:"phone",
          type:"antdesign"
        }}
        placeholderText={"09xx.xxx.xxx"}
      />

      <InputText 
        label="Password"
        icon={{
          name:"lock",
          type:"feather"
        }}
        placeholderText={"********"}
      />

      <InputText 
        label="Confirm Password"
        icon={{
          name:"lock",
          type:"feather"
        }}
        placeholderText={"********"}
      />

      <Button
        title="Sign Up"
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
    marginTop: 20,
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


export default SignUp;