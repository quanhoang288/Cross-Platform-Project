import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import {Input, Icon} from 'react-native-elements'


const InputText = () => {
  return (
    <Input
      leftIcon={
        <Icon
          name="map-marker"
          type="font-awesome"
          color="#86939e"
          size={25}
        />
      }
      leftIconContainerStyle={{ marginLeft: 4, marginRight: 12 }}
      inputContainerStyle={{
        margin: 8
      }}
      placeholder="password"
    />
  );
};



InputText.propTypes = {
    
};

InputText.defaultProps = {
    
};

export default InputText;