import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, StyleSheet, Clipboard} from 'react-native';
import {Bubble, GiftedChat, Send,InputToolbar} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {io} from 'socket.io-client';
import axios from 'axios';
import { message } from '../../apis';
import { set } from 'react-native-reanimated';
import { margin, marginBottom, paddingBottom } from 'styled-system';
import { SOCKET_URL } from '../../configs';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { stacks } from '../../constants/title';
const ChatScreen = () => {
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const {chatId, receivedId} = route.params;
  const user = useSelector(state => state.auth.user);
  const senderId = user._id;
  const token = user.token;
  const navigation = useNavigation();
  useEffect(() => {
    const initialize = async () => {
      const newMessages = await fetchMessages();
      if(newMessages){
        console.log(newMessages);
        setMessages(newMessages.map(msg => ({
          _id: msg.user._id !== senderId ? senderId : receivedId,
          text: msg.content,
          createdAt: msg.createdAt,
          user: {
            _id: msg.user._id,
            name: msg.user.username,
        },
        })).reverse());
      }
      socket.current = io(SOCKET_URL);
      
    }
    initialize();
  }, []);
  useEffect(() => {
    navigation.setOptions({ 
        headerRight: () => (
          <Icon 
            type='feather' 
            name='more-horizontal' 
            size={32}  
            style={{marginRight: 10}}
            onPress={() => navigation.navigate(stacks.chatSetting.name, {
              chatId: chatId,
            })}
          />
        )
    });
}, [navigation]);

  useEffect(() => {
    socket.current?.on('getMessage', (data) => {
      if (senderId === data.receivedId) {
        const newMsg = {
          _id: data._id,
          text: data.content, 
          createdAt: data.createdAt,
          user: {
            _id: data.senderId,
          },
        };
       
        setMessages((previousMessages) => GiftedChat.append(previousMessages, [newMsg]));
      } 
    });
    socket.current?.on('removeMess', (data) => {
      if (receiverId === data.userId) {
        setMessages((previousMessages)=>
        previousMessages.filter(messages => messages._id !== data._id )
      );   
      } 
    });
  }, [socket])


  const fetchMessages = async () => {
    try {
        const res = await message.getMessages(chatId, token);
        return res.data.data;
        console.log(res.data.data)
    } catch (err) {
        console.log(err.message);
    }
  }

  const onSend = useCallback(async (messages = []) => {
    if (messages.length > 0) {
      const newMsgObj = messages[0];
      try {
        const sendResult = await message.sendMessage(chatId, senderId, receivedId, newMsgObj.text, token);
        const newMsg = sendResult.data.data;
        socket.current?.emit('sendMessage', {
          chatId: chatId,
          _id: newMsg._id,
          senderId: senderId,
          receivedId: receivedId,
          content: newMsgObj.text,
          createdAt: newMsg.createdAt
        });
        
      } catch (err) {
        console.log(err)
      }

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages),
      );
      
    }
   
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{paddingBottom:-20 , marginRight: 2}}
            size={40}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  // const renderInputToolbar = props => {
  //   return (
  //     <InputToolbar
  //       {...props}
  //       containerStyle={{
  //         backgroundColor: "white",
  //         borderTopColor: "#E8E8E8",
          
  //         marginBottom:20,
  //         paddingTop:2,
  //         paddingBottom:1,
  //       }}
  //     />
  //   );
  // };
  const onDelete = async(messageIdToDelete) => {
    setMessages((previousMessages)=>
      previousMessages.filter(messages => messages._id !== messageIdToDelete )
    );
    const deleteMess = await message.deleteMessage(chatId,messageIdToDelete,token);
    console.log(deleteMess.data.data);
    const messDelete = deleteMess.data.data;
    socket.current?.emit('deleteMessage', {
      _id: messDelete._id,
      userId: messDelete.user,
    });
  }
  
  const onLongPress = (context, message) =>{
    console.log( message);
    const options = ['copy','Delete Message', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions({
        options,
        cancelButtonIndex
    }, (buttonIndex) => {
        switch (buttonIndex) {
            case 0:
                Clipboard.setString(message.text);
                break;
            case 1:
                console.log("delete");
                onDelete(message._id);
                break;
        }
    });

  }
  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: senderId,
      }}      
      // renderInputToolbar={props => renderInputToolbar(props)}
      onLongPress={onLongPress}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});