import React, { useState } from "react";
import { Button, Text, View, SafeAreaView, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Card } from 'react-native-elements';


const DialogWrapper = props => {
    return (
      <View style={{ flex: 1 }}>
        <Modal 
          isVisible={props.isModalVisible}
          swipeDirection={['down']}
          onSwipeComplete={props.toggleModal}
          onBackdropPress={props.toggleModal}
        >
          {props.children}
    
        </Modal>
      </View>
    );
}

const DialogContent = props => {
    return (
        <View style={styles.content}>
            <Text style={styles.title}>{props.title}</Text>
            <Divider />    
            <View style={{marginTop: 10}}>
              <Text>{props.content}</Text>
              <View style={styles.buttonGroup}>
                  <Text>{props.noOptionTitle}</Text>
                  <Text style={{marginLeft: 10}}>{props.yesOptionTitle}</Text>
              </View>
            </View>
        </View>
    )
}

DialogContent.defaultProps = {
    noOptionTitle: 'Cancel',
    yesOptionTitle: 'OK',
};

const ConfirmDialog = props => {
    return (
        <DialogWrapper isModalVisible={props.isModalVisible} toggleModal={props.toggleModal}>
            <DialogContent/>
        </DialogWrapper>
    );
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        justifyContent: 'center',
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: 20, 
        fontWeight: 'bold', 
        marginBottom: 4,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default ConfirmDialog;