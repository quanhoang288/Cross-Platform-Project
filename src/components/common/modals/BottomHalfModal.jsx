import React, { useState } from "react";
import { Button, Text, View, SafeAreaView, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import {ListItem, Divider, Icon} from 'react-native-elements';


const ModalWrapper = (props) => {
    return (
      <View style={{ flex: 1 }}>
        <Modal 
          isVisible={props.isModalVisible}
          swipeDirection={['down']}
          onSwipeComplete={props.toggleModal}
          onBackdropPress={props.toggleModal}
          style={styles.view}
        >
          {props.children}
    
        </Modal>
      </View>
    );
  }

const BottomHalfModal = (props) => {
    return (
        <ModalWrapper isModalVisible={props.isModalVisible} toggleModal={props.toggleModal}>
            <View style={styles.content}>
                {props.children}
            </View>
        </ModalWrapper>
    );
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        justifyContent: 'center',
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    view: {
        justifyContent: 'flex-end',
        margin: 0,
    }
});

export default BottomHalfModal;