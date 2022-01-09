const initialState = {
  chats: [],
  curChatRoomId: null,
};

const updateChats = (latestMessage, chatList, curChatRoomId) => {
  const chatToUpdate = chatList.find((chat) => chat.id == latestMessage.chatId);

  if (!chatToUpdate) {
    return [
      {
        ...latestMessage,
        id: latestMessage.chatId,
        messageText: latestMessage.content,
        latestMessageSentAt: latestMessage.createdAt,
      },
      ...chatList,
    ];
  }

  const updatedChat = {
    ...chatToUpdate,
    messageText: latestMessage.content,
    latestMessageSentAt: latestMessage.createdAt,
    numUnseenMessages:
      latestMessage.senderId == chatToUpdate.receivedId &&
      latestMessage.chatId != curChatRoomId
        ? chatToUpdate.numUnseenMessages + 1
        : 0,
  };
  const chatListWithoutUpdatedChat = chatList.filter(
    (chat) => chat.id != latestMessage.chatId,
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

const removeLatestMessage = (chatId, chatList) => {
  return chatList.map((chat) => {
    if (chat.id != chatId) {
      return chat;
    }
    return {
      ...chat,
      messageText: 'Message unsent',
    };
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE':
      return {
        ...state,
        chats: action.payload,
      };

    case 'UPDATE':
      return {
        ...state,
        chats: updateChats(action.payload, state.chats, state.curChatRoomId),
      };

    case 'UPDATE_CURRENT_CHAT_ROOM':
      console.log('new chat room: ', action.payload);
      return {
        ...state,
        curChatRoomId: action.payload,
      };

    case 'UPDATE_SEEN_STATUS':
      return {
        ...state,
        chats: updateSeenStatus(action.payload, state.chats),
      };

    case 'REMOVE':
      return {
        ...state,
        chats: state.chats.filter((chat) => chat._id != action.payload),
      };

    case 'REMOVE_LATEST_MESSAGE':
      return {
        ...state,
        chats: removeLatestMessage(action.payload, state.chats),
      };

    default:
      return state;
  }
};
