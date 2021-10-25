import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { InputText } from '../../components/block';

const personalInformation = () =>{
  return(
    <View style={styles.container}>
      <InputText 
        label={'User Name:'}
        placeholderText={"NXTung"}
      />

      <InputText 
        label={'Gender:'}
        placeholderText={"Male or Female"}
      />

      <InputText 
        label={'Birthday:'}
        placeholderText={"dd/mm/yyyy"}
      />

      <InputText 
        label={'Contact:'}
        placeholderText={"09xx.xxx.xxx"}
      />

      <Button
        title="Change"
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


export default personalInformation;