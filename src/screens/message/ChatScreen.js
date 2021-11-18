import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {io} from 'socket.io-client';
import axios from 'axios';
import { message } from '../../apis';
import { set } from 'react-native-reanimated';

const ChatScreen = () => {
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  
  const chatId = "619526c2cc375b3fb8d08717";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRydW5ndnVob2FuZyIsImlkIjoiNjE4ZTk3NTg3NDU1MGEyMmE0Y2IyYTkwIiwiaWF0IjoxNjM2NzM0ODA5fQ.NwBPkKkhl8IHr64k-4EwTPMhtzY2IM0J6TXqm8c-DNk";
  const receiverId = '618e992874550a22a4cb2a98';
  const senderId = '618e975874550a22a4cb2a90';

  useEffect(() => {
    const initialize = async () => {
      const newMessages = await fetchMessages();
      setMessages(newMessages.map(msg => ({
        _id: msg._id,
        text: msg.content,
        createdAt: msg.createdAt,
        user: {
          _id: msg.user._id,
          name: msg.user.username,
        },
      })).reverse());

      socket.current = io('ws://localhost:3000');
      socket.current.on('getMessage', async (data) => {
        //if receivedID !== current.User._Id
        setArrivalMessage({
            sender: data.senderId,
            content: data.content, 
            createdAt: Date.now(),
        });
      });
    }
    initialize();
  }, []);

  const fetchMessages = async () => {
    try {
        const res = await message.getMessages(chatId, token);
        return res.data.data;
    } catch (err) {
        console.log(err);
    }
  }

  const onSend = useCallback(async (messages = []) => {
    if (messages.length > 0) {
      const newMsgObj = messages[0];
        // if (currentChat) {
      try {
        const sendResult = await message.sendMessage(chatId, senderId, receiverId, newMsgObj.text, token);
        //TODO: gui socket + update mang messages
        // socket.current.emit('sendMessage', {
        //   senderId: "618e975874550a22a4cb2a90",
        //   receivedId: receiverId,
        //   member: [
        //       {_id:"618e992874550a22a4cb2a98"},
        //       {_id:"618e975874550a22a4cb2a90"}
        //   ],
        //   content: newMsg,
        //   type: "PRIVATE_CHAT",
        // });
        
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
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
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

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: senderId,
      }}      
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
