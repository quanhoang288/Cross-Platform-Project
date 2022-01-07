const initialState = {
  chats: [],
};

const updateChats = (chatData, chatList) => {
  const chatToUpdate = chatList.find((chat) => chat.id == chatData.chatId);

  if (!chatToUpdate) {
    return [
      { ...chatData, id: chatData.chatId, messageText: chatData.content },
      ...chatList,
    ];
  }

  const updatedChat = {
    ...chatToUpdate,
    messageText: chatData.content,
  };
  const chatListWithoutUpdatedChat = chatList.filter(
    (chat) => chat.id != chatData.chatId,
  );
  return [updatedChat, ...chatListWithoutUpdatedChat];
};

const updateSeenStatus = (chatId, chatList) => {
  return chatList.map((chat) => {
    if (chat.id != chatId) {
      return chat;
    }
    return {
      ...chat,
      numUnseenMessages: 0,
    };
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE':
      return {
        chats: action.payload,
      };

    case 'UPDATE':
      return {
        chats: updateChats(action.payload, state.chats),
      };

    case 'UPDATE_SEEN_STATUS':
      return {
        chats: updateSeenStatus(action.payload, state.chats),
      };

    case 'REMOVE':
      return {
        chats: state.chats.filter((chat) => chat.id != action.payload),
      };

    default:
      return state;
  }
};
