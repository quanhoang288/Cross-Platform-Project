import React, { useEffect, useState } from 'react';
import BottomHalfModal from './BottomHalfModal';
import { View } from 'react-native';
import { Divider, Icon, ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { friend } from '../../../apis';
import { Toast } from '../../../helpers';
import { hideModal } from '../../../redux/reducers/modalReducer';

const RespondModal = ({ otherUserId, callback }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleAcceptRequest = async () => {
    try {
      await friend.acceptFriendRequest(otherUserId, '1', user.token);
      callback(true);
      dispatch(hideModal());
    } catch (error) {
      console.log(err);
      Toast.showFailureMessage('Error accepting friend request');
    }
  };

  const handleRejectRequest = async () => {
    try {
      await friend.acceptFriendRequest(otherUserId, '2', user.token);
      callback(false);
      dispatch(hideModal());
    } catch (error) {
      console.log(err);
      Toast.showFailureMessage('Error deleting friend request');
    }
  };

  const functionalities = [
    {
      title: 'Confirm',
      icon: {
        type: 'material-community',
        name: 'account-check',
      },
      onPress: handleAcceptRequest,
    },

    {
      title: 'Delete request',
      icon: {
        type: 'font-awesome',
        name: 'times',
      },
      onPress: handleRejectRequest,
    },
  ];

  return (
    <BottomHalfModal isModalVisible={true}>
      <View
        style={{
          height: 100,
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

export default RespondModal;
