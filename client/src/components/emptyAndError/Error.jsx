import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../constants/dimensions';

const Error = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/NoConnection.png')}
        style={styles.image}
      />
      <Text style={styles.textTitle}>{title}</Text>
      <Text style={styles.textDescription}>{description}</Text>
      <Text style={styles.textButton} onPress={() => console.log('try again')}>
        Retry
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255, 255, 255)',
    alignItems: 'center',
    paddingVertical: 16,
  },

  image: {
    height: DEVICE_HEIGHT / 4,
    width: DEVICE_WIDTH / 1.5,
    // height: 200,
    // width: 300,
    minHeight: 100,
    minWidth: 150,
    maxHeight: 200,
    maxWidth: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  textTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 10,
  },

  textDescription: {
    textAlign: 'center',
    width: 300,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },

  textButton: {
    fontSize: 14,
    fontWeight: '500',
    color: 'red',
  },
});

export default Error;
