import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Input, Icon } from 'react-native-elements';

const InputText = (props) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  let inputProps = {};
  if (props.leftIcon) {
    inputProps = {
      ...inputProps,
      leftIcon: (
        <Icon
          name={props.leftIcon.name}
          type={props.leftIcon.type}
          style={{ marginRight: 12 }}
          color="rgba(110, 120, 170, 1)"
          size={25}
        />
      ),
    };
  }

  if (props.label) {
    inputProps = {
      ...inputProps,
      label: props.label,
      labelStyle: { marginTop: 8 },
    };
  }

  if (props.errorMessage) {
    inputProps = {
      ...inputProps,
      errorMessage: props.errorMessage,
      errorStyle: styles.errorInputStyle,
    };
  }

  if (props.isPassword) {
    inputProps = {
      ...inputProps,
      secureTextEntry: !isPasswordVisible,
      rightIcon: (
        <Icon
          name={isPasswordVisible ? 'eye-with-line' : 'eye'}
          type="entypo"
          onPress={() => setPasswordVisible(!isPasswordVisible)}
        />
      ),
    };
  }

  return (
    <Input
      labelStyle={{ marginTop: 16 }}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.inputStyle}
      placeholder={props.placeholderText}
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType="default"
      returnKeyType="next"
      value={props.value}
      onChangeText={(text) => props.handleTextChange(props.name, text)}
      {...inputProps}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    padding: 0,
    // borderRadius: 4,
    // borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 45,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 8,
    color: 'black',
    fontSize: 18,
  },
  errorInputStyle: {
    color: '#F44336',
    fontSize: 16,
    // marginLeft: 8,
    marginTop: 0,
    marginBottom: 12,
  },
});

InputText.propTypes = {};

InputText.defaultProps = {
  type: 'name',
};

export default InputText;
