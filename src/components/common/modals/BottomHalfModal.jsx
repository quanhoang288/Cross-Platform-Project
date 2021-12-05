import React, { useState } from "react";
import { Button, Text, View, SafeAreaView, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { ListItem, Divider, Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { hideModal } from "../../../redux/reducers/modalReducer";

const ModalWrapper = (props) => {
  const dispatch = useDispatch();

  return (
    <Modal
      isVisible={props.isModalVisible}
      swipeDirection={["down"]}
      onSwipeComplete={() => dispatch(hideModal())}
      onBackdropPress={() => dispatch(hideModal())}
      style={styles.view}
    >
      {props.children}
    </Modal>
  );
};

const BottomHalfModal = (props) => {
  return (
    <ModalWrapper
      isModalVisible={props.isModalVisible}
      hideModal={props.hideModal}
    >
      {props.children}
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    justifyContent: "center",
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
});

export default BottomHalfModal;
