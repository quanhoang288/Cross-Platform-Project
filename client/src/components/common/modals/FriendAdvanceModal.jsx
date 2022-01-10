import React, { useEffect, useState } from 'react';
import BottomHalfModal from './BottomHalfModal';
import { View } from 'react-native';
import { Divider, Icon, ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, showModal } from '../../../redux/reducers/modalReducer';
import { types } from '../../../constants/modalTypes';
import { useNavigation } from '@react-navigation/core';
import { stacks } from '../../../constants/title';
import { friend } from '../../../apis';
import { Toast } from '../../../helpers';
const FriendAdvanceModal = ({ userId, username, avatar }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleMessage = () => {
    //TODO: redirect to message screen
    dispatch(hideModal());
    navigation.navigate(stacks.chatScreen.name, {
      receiver: {
        _id: userId,
        username,
        avatar,
      },
    });
  };

  const handleBlock = () => {
    //TODO: block user
    dispatch(hideModal());
    Toast.showFailureMessage('Not implemented yet');
  };

  const handleConfirmRemove = async () => {
    try {
      await friend.removeFriend(userId, user.token);
      dispatch(hideModal());
      Toast.showSuccessMessage('Remove friend successfully');
    } catch (error) {
      console.log(error);
      Toast.showFailureMessage('Error removing friend');
    }
  };

  const handleRemoveFriend = () => {
    console.log('friend id: ', userId);
    dispatch(
      showModal({
        modalType: types.confirm,
        propsData: {
          isModalVisible: true,
          title: 'Unfriend',
          content: 'Are you sure you want to unfriend this person?',
          yesOptionTitle: 'Yes',
          noOptionTitle: 'Cancel',
          userId: userId,
          handleCancel: () => dispatch(hideModal()),
          handleConfirm: handleConfirmRemove,
        },
      }),
    );
  };

  const functionalities = [
    {
      title: 'Message',
      icon: {
        type: 'ant-design',
        name: 'message1',
      },
      onPress: handleMessage,
    },

    {
      title: 'Block',
      subTitle: "This person won't be able to see your posts.",
      icon: {
        type: 'entypo',
        name: 'block',
      },
      onPress: handleBlock,
    },

    {
      title: 'Unfriend',
      subTitle: 'Remove this person as a friend.',
      icon: {
        type: 'material-community',
        name: 'account-remove-outline',
      },
      onPress: handleRemoveFriend,
    },
  ];

  return (
    <BottomHalfModal isModalVisible={true}>
      <View
        style={{
          height: 250,
          backgroundColor: '#fff',
          justifyContent: 'center',
          borderTopStartRadius: 10,
          borderTopEndRadius: 10,
        }}
      >
        {functionalities.map((func, idx) => (
          <ListItem key={idx} onPress={func.onPress}>
            <Icon
              type={func.icon.type}
              name={func.icon.name}
              style={{ marginRight: 4 }}
            />
            <ListItem.Content>
              <ListItem.Title>{func.title}</ListItem.Title>
              {func.subTitle && (
                <ListItem.Subtitle>{func.subTitle}</ListItem.Subtitle>
              )}
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </BottomHalfModal>
  );
};

export default FriendAdvanceModal;
