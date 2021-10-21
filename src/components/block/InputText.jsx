import React, { useState } from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Input, Icon} from 'react-native-elements'



const InputText = (props) => {
  // const [inputText, setInputText] = useState("");


  let inputProps = {}
  if(props.icon){
    inputProps = {
      ...inputProps,
      leftIcon:(
        <Icon
          name={props.icon.name}
          type={props.icon.type}
          style={{ marginRight: 12 }}
          color="rgba(110, 120, 170, 1)"
          size={25}
        />
      ),
    }
  }

  if(props.image){
    inputProps={
      ...inputProps,

    }
  }

  return (
    <Input
      name=""
      label={props.label}
      onChange={ (e) => props.handleChange(e.target.name, e.target.value) }

      labelStyle={{ marginTop: 16 }}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.inputStyle}
      placeholder={props.placeholderText}
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType='phone-pad'
      errorStyle={styles.errorInputStyle}
      returnKeyType="next"
      {...inputProps}
    />
  );
};

const styles = StyleSheet.create({
  container:{

  },
  inputContainer:{
    paddingLeft: 8,
    paddingRight:8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 45,
    marginVertical: 10,
  },
  inputStyle:{
    flex: 1,
    marginLeft: 8,
    color: 'black',
    fontFamily: 'UbuntuLight',
    fontSize: 18,
  },
  errorInputStyle:{
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  }
})

InputText.propTypes = {
    
};

InputText.defaultProps = {
    
};

export default InputText;