const saveChats = (chats) => {
  return {
    type: 'SAVE',
    payload: chats,
  };
};

const updateChat = (chatData) => {
  return {
    type: 'UPDATE',
    payload: chatData,
  };
};

const removeChat = (chatId) => {
  return {
    type: 'REMOVE',
    payload: chatId,
  };
};

const updateSeenStatus = (chatId) => {
  return {
    type: 'UPDATE_SEEN_STATUS',
    payload: chatId,
  };
};

export { saveChats, updateChat, removeChat, updateSeenStatus };
