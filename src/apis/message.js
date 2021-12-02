import api from './api';

const getMessages = async (chatId, token) => {
    const getResult = await api({
        method: 'GET',
        url: `/chats/getMessages/${chatId}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return getResult;
}

const getChats = async (userId, token) =>{
    const getList = await api({
        method: 'GET',
        url: `/chats/getChats/${userId}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return getList;
}
const deleteMessage = async (chatId, messageId, token) =>{
    const messageDelete = {
        messageId: messageId,
        chatId: chatId,
    };
    const deleteMess = await api({
        method: 'POST',
        url: 'chats/deleteMessage',
        data: messageDelete,
        headers: {
            'Authorization': `Bearer ${token}`
        },
       
    });
    return deleteMess;
};

const deleteChat = async(chatId, token) =>{
    const chatDelete ={
        chatId: chatId,
    }
    const deleteC = await api({
        method: 'POST',
        url: 'chats/deleteChat',
        data: chatDelete,
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    return deleteC;
}

const sendMessage = async (chatId, senderId, receiverId, msg, token) => {
    const newMessage = {
        receivedId: receiverId,
        chatId: chatId,
        member: [
            {_id: senderId},
            {_id: receiverId}
        ],
        content: msg,
        type: "PRIVATE_CHAT"
      };

    
    const sendResult = await api({
        method: 'POST',
        url: '/chats/send/',
        data: newMessage,
        headers: {
        'Authorization': `Bearer ${token}`
        }
    });

    return sendResult;
}

export { getMessages, sendMessage, getChats, deleteMessage, deleteChat};


