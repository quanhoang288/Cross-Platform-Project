import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {io} from 'socket.io-client';
import axios from 'axios';
const ChatScreen = () => {
  const socket = useRef();
  const [currentChat, setCurrent, ] = useState(null);
  const [Chatmessages, setChatmessages] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  
  const chatId ="619526c2cc375b3fb8d08717";
  const fetchMessage = async () => {
    try {
        const res = await axios.get(`http://localhost:8000/api/v1/chats/getMessages/${chatId}/`,);
        setChatList(res.data);
    } catch (err) {
        console.log(err);
    }
  }


  const sendMessage = async (content) => {
    const newMessage = {
      "receivedId":"618e992874550a22a4cb2a98",
      "chatId": "619526c2cc375b3fb8d08717",
      "member": [
          {"_id":"618e992874550a22a4cb2a98"},
          {"_id":"618e975874550a22a4cb2a90"}
      ],
      "content": content,
       "type": "PRIVATE_CHAT"
    };

    try {
        const res = await axios.post(`http://localhost:8000/api/v1/chats/send/`,newMessage);
        return res.data;
    } catch (err) {
        console.log(err);
    }
  }

  const handleSubmit = async () => {

    let receiverId = "618e992874550a22a4cb2a98";
  
    if (messages !== '') {

        // if (currentChat) {
            await sendMessage(messages);
            socket.current.emit('sendMessage', {
              senderId: "618e975874550a22a4cb2a90",
              receivedId: receiverId,
              member: [
                  {_id:"618e992874550a22a4cb2a98"},
                  {_id:"618e975874550a22a4cb2a90"}
              ],
              content: newMassage,
              type: "PRIVATE_CHAT",
            });
            // addNewMessage();
        // }
        // else {
        //     const newConversation = await initializeConversation(user._id, newUserId)
        //     await saveMessage(receiverId, content);

        //     setCurrentChat(newConversation);
        //     setNewUserId(null);
        // }
    }

  }
  // const [messages, setMessages] = useState([]);
  <Button
        title={'React Native Elements'}
        containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
        }}
  />
  useEffect(() =>{
    socket.current = io('ws://localhost:3000');
    fetchMessage();
    socket.current.on('getMessage', async (data) => {
      //if receivedID !== current.User._Id
      setArrivalMessage({
          sender: data.senderId,
          content: data.content, 
          createdAt: Date.now(),
      });
    
  });
  })
  useEffect(() => {
    
    setMessages([
      {
        _id: 1,
        text: 'Hello',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Quan',
          avatar: require('../../../assets/avatar.jpg'),
        },
      },
      
      {
        _id: 2,
        text: require('../../../assets/avatar.jpg'),
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Trung',
          avatar: require('../../../assets/avatar.jpg'),
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
      
    );
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
      handleSubmit={handleSubmit}
      onSend={(messages) => onSend(messages)}
      
      user={{
        _id: 1,
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
