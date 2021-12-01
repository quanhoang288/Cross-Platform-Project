import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Icon,
  ListItem,
} from 'react-native-elements';
import { message } from '../../apis';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const ChatSetting = ()  => {
    const route = useRoute();
    const {chatId} = route.params;
    const user = useSelector(state => state.auth.user);
    const token = user.token;
    const onPress = async() =>{
        const deleteC = await message.deleteChat(chatId, token);
        console.log(deleteC.data.data);
    }
    return(
        
        <ScrollView style={styles.ScrollView}>

            <TouchableOpacity onPress = {onPress}>
            <ListItem>
                <Icon
                   type='feather' 
                   name='trash-2' 
                   size={32} 
                />
                <ListItem.Title>Delete Chat </ListItem.Title>
            </ListItem>
            </TouchableOpacity>
        </ScrollView>
     
    )
}
export default ChatSetting;
const styles = StyleSheet.create({
    ScrollView:{
        flex: 1
    }
})