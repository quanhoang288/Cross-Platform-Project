import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { message } from '../../apis';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { stacks } from '../../constants/title';
import { Toast } from '../../helpers';
const ChatSetting = () => {
  const route = useRoute();
  const { chatId, receivedId } = route.params;
  const user = useSelector((state) => state.auth.user);
  const socket = useSelector((state) => state.auth.socket);
  const navigation = useNavigation();

  useEffect(() => {
    console.log(route.params);
  }, [route]);

  const onPressDeleteChat = async () => {
    try {
      await message.deleteChat(chatId, user.token);
    } catch (err) {
      console.log(err);
      if (err.response.status == 404) {
        navigation.navigate('MessageStack');
      } else {
        Toast.showFailureMessage('Error deleting chat');
      }
      return;
    }
    socket?.emit('deleteChat', {
      chatId,
      deletedBy: user.id,
    });
    navigation.navigate('MessageStack');
  };

  const onPressBlockUser = async () => {
    const rs = await message.blockChat(receivedId, token);
    socket?.emit('blockUser', {
      userId: user.id,
      receivedId: receivedId,
    });
    navigation.navigate(stacks.chatScreen.name);
  };
  return (
    <ScrollView style={styles.ScrollView}>
      <TouchableOpacity onPress={onPressDeleteChat}>
        <ListItem>
          <Icon type="feather" name="trash-2" size={32} />
          <ListItem.Title>Delete Chat </ListItem.Title>
        </ListItem>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressBlockUser}>
        <ListItem>
          <Icon type="feather" name="slash" size={32} />
          <ListItem.Title>Block User </ListItem.Title>
        </ListItem>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default ChatSetting;
const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
  },
});
