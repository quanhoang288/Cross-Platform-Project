import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Divider, Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../../redux/reducers/modalReducer';

const DialogWrapper = (props) => {
  const dispatch = useDispatch();
  return (
    <Modal
      isVisible={true}
      swipeDirection={['down']}
      onSwipeComplete={() => dispatch(hideModal())}
      onBackdropPress={() => dispatch(hideModal())}
    >
      {props.children}
    </Modal>
  );
};

const DialogContent = (props) => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>{props.title}</Text>
      <Divider />
      <View style={{ marginTop: 10 }}>
        <Text style={styles.contentText}>{props.content}</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={props.handleCancel}>
            <Text style={styles.noOptionStyle}>{props.noOptionTitle}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.handleConfirm}>
            <Text style={styles.yesOptionStyle}>{props.yesOptionTitle}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

DialogContent.defaultProps = {
  noOptionTitle: 'No',
  yesOptionTitle: 'Yes',
};

const ConfirmDialog = (props) => {
  return (
    <DialogWrapper>
      <DialogContent {...props} />
    </DialogWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentText: {
    fontSize: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  noOptionStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  yesOptionStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 20,
    color: 'blue',
  },
});

export default ConfirmDialog;
