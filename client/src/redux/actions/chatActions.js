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

const removeLatestMessage = (chatId) => {
  return {
    type: 'REMOVE_LATEST_MESSAGE',
    payload: chatId,
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

const updateCurrentChatRoom = (chatId) => {
  return {
    type: 'UPDATE_CURRENT_CHAT_ROOM',
    payload: chatId,
  };
};

export {
  saveChats,
  updateChat,
  removeChat,
  removeLatestMessage,
  updateSeenStatus,
  updateCurrentChatRoom,
};
