import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Button, Icon, Image, Text } from 'react-native-elements';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../constants/dimensions';

const Empty = ({
  title,
  description,
  hasButton,
  buttonTitle,
  handleButtonPress,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/NoContent.png')}
        style={styles.image}
      />
      <Text style={styles.textTitle}>{title}</Text>
      <Text style={styles.textDescription}>{description}</Text>
      {hasButton && (
        <Text style={styles.textButton} onPress={handleButtonPress}>
          {buttonTitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },

  image: {
    height: DEVICE_HEIGHT / 5,
    width: DEVICE_WIDTH / 1.5,
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
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
    color: 'blue',
  },
});

Empty.defaultProps = {
  hasButton: false,
};

export default Empty;
