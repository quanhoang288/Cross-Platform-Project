import React, { useEffect, useState } from 'react';
import BottomHalfModal from './BottomHalfModal';
import { StyleSheet, View } from 'react-native';
import { Divider, Icon, ListItem, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Popup from './Popup';
import { post } from '../../../apis';
import { Toast } from '../../../helpers';
import { hideModal } from '../../../redux/reducers/modalReducer';

const PostReportModal = ({ postId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const options = [
    {
      title: 'Nudity',
    },
    {
      title: 'Violence',
    },
    {
      title: 'False information',
    },
    {
      title: 'Spam',
    },
  ];

  const handleReportPost = async (subject) => {
    try {
      await post.postReport(postId, subject, user.token);
      dispatch(hideModal());
      Toast.showSuccessMessage('Report post successfully');
    } catch (error) {
      console.log(error);
      Toast.showFailureMessage('Error reporting post');
    }
  };

  return (
    <Popup isModalVisible={true}>
      <View style={styles.container}>
        <Text style={styles.title}>Report Post</Text>
        <Divider />
        {options.map((option, idx) => (
          <ListItem key={idx} onPress={() => handleReportPost(option.title)}>
            <ListItem.Content>
              <ListItem.Title style={styles.optionText}>
                {option.title}
              </ListItem.Title>
              <Divider />
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </Popup>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 280,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  title: {
    fontSize: 24,
    marginLeft: 14,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  optionText: {
    fontSize: 18,
  },
});

export default PostReportModal;
