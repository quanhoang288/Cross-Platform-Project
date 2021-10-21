import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { InputText } from '../../components/block';

const ChangePW = () =>{
  return(
    <View style={styles.container}>
      <InputText
        label = {"Current password"}
        placeholderText={"Enter current password"}
      />

      <InputText
        label={"New password"} 
        placeholderText={"Enter new password"}
      />

      <InputText 
        placeholderText={"Confirm new Password"}
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


export default ChangePW;