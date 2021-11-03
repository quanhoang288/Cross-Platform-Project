import React, { useState } from "react";
import { Button, Text, View, SafeAreaView, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import { hideModal } from "../../../redux/reducers/modalReducer";


const PopupWrapper = props => {
    const dispatch = useDispatch();

    return (
        <Modal 
          isVisible={props.isModalVisible}
          swipeDirection={['down']}
          onSwipeComplete={() => dispatch(hideModal())}
          onBackdropPress={() => dispatch(hideModal())}
        >
          {props.children}
        </Modal>
    );
}


const Popup = props => {
    return (
        <PopupWrapper isModalVisible={props.isModalVisible}>
            <View style={styles.content}>
                {props.children}
             </View>
        </PopupWrapper>
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

export default Popup;