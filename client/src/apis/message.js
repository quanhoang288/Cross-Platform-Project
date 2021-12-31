import api from './api';

const getMessageByOtherUserId = async (
  receivedId,
  token,
  offset = 0,
  limit = 10,
) => {
  const getResult = await api({
    method: 'GET',
    url: `/chats/getMessages?otherUserId=${receivedId}&offset=${offset}&limit=${limit}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return getResult;
};

const getChats = async (token) => {
  const getList = await api({
    method: 'GET',
    url: `/chats/list`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return getList;
};
const deleteMessage = async (messageId, token) => {
  const messageDelete = {
    messageId: messageId,
  };
  console.log(messageDelete);
  const deleteMess = await api({
    method: 'POST',
    url: 'chats/deleteMessage',
    data: messageDelete,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return deleteMess;
};

const deleteChat = async (chatId, token) => {
  const chatDelete = {
    chatId: chatId,
  };
  const deleteC = await api({
    method: 'POST',
    url: 'chats/deleteChat',
    data: chatDelete,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return deleteC;
};

const sendMessage = async (receiverId, msg, token) => {
  const newMessage = {
    receivedId: receiverId,
    content: msg,
  };

  const sendResult = await api({
    method: 'POST',
    url: '/chats/send/',
    data: newMessage,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return sendResult;
};
const sendNewMessage = async (senderId, receiverId, msg, token) => {
  const newMessage = {
    receivedId: receiverId,
    member: [{ _id: senderId }, { _id: receiverId }],
    content: msg,
    type: 'PRIVATE_CHAT',
  };

  const sendResult = await api({
    method: 'POST',
    url: '/chats/send/',
    data: newMessage,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return sendResult;
};

const blockChat = async (user_id, token) => {
  const userBlocked = {
    user_id: user_id,
    type: 'PRIVATE_CHAT',
  };
  const block = await api({
    method: 'POST',
    url: 'users/set-block-user/',
    data: userBlocked,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return block;
};

const unBlockChat = async (user_id, token) => {
  const userBlocked = {
    user_id: user_id,
  };
  const unBlock = await api({
    method: 'POST',
    url: 'users/set-block-user/',
    data: userBlocked,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return unBlock;
};

const getBlockChat = async (token) => {
  const getBlock = await api({
    method: 'POST',
    url: 'users/set-block-diary/',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return getBlock;
};

export {
  getMessageByOtherUserId,
  sendMessage,
  getChats,
  deleteMessage,
  deleteChat,
  sendNewMessage,
  blockChat,
  unBlockChat,
  getBlockChat,
};
