import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { message } from '../../apis';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const ChatSetting = () => {
  const route = useRoute();
  const { chatId, receivedId } = route.params;
  const user = useSelector((state) => state.auth.user);
  const token = user.token;
  const socket = useSelector((state) => state.auth.socket);
  const onPressDeleteChat = async () => {
    const deleteC = await message.deleteChat(chatId, token);
    console.log(deleteC.data.data);
    socket?.emit('deleteChat', {
      chatId: chatId,
    });
  };
  const onPressBlockUser = async () => {
    const rs = await message.blockChat(receivedId, token);
    socket?.emit('blockUser', {
      userId: user.id,
      receivedId: receivedId,
    });
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
