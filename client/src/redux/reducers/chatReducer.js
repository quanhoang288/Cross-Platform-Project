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

    case 'REMOVE':
      return { chats: chats.filter((chat) => chat._id != action.payload) };

    default:
      return state;
  }
};
