const { PRIVATE_CHAT, GROUP_CHAT } = require("../constants/constants");
const ChatModel = require("../models/Chats");
const MessagesModel = require("../models/Messages");
const ChatHistoryModel = require("../models/ChatHistories");
const getPaginationParams = require("../utils/getPaginationParams");
const httpStatus = require("../utils/httpStatus");
const { isValidId } = require("../utils/validateIdString");

const chatController = {};
chatController.send = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { receivedId, content } = req.body;

    let chatId;

    const existingChat = await ChatModel.findOne({
      member: { $all: [userId, receivedId] },
    });

    if (existingChat) {
      chatId = existingChat._id;
    } else {
      const newChat = new ChatModel({
        type: PRIVATE_CHAT,
        member: [userId, receivedId],
      });
      const savedChat = await newChat.save();
      chatId = savedChat._id;
    }

    if (content) {
      let message = new MessagesModel({
        chat: chatId,
        user: userId,
        content: content,
      });
      await message.save();
      const savedMessage = await MessagesModel.findById(message._id)
        .populate("chat")
        .populate({
          path: "user",
          select: "_id username",
          populate: {
            path: "avatar",
            select: "_id fileName",
            model: "Documents",
          },
          model: "Users",
        });

      const updatedChat = await ChatModel.findByIdAndUpdate(chatId, {
        latestMessageSentAt: savedMessage.createdAt,
      });

      // update or create new chat history for receiver
      const receiverId = updatedChat.member.find((user) => user._id != userId);
      const receiverChatHistory = await ChatHistoryModel.findOne({
        user: receiverId,
      });

      if (!receiverChatHistory) {
        const newChatHistory = new ChatHistoryModel({
          user: receiverId,
          chat: chatId,
          numUnseenMessages: 1,
        });
        await newChatHistory.save();
      } else {
        const oldNumUnseen = receiverChatHistory.numUnseenMessages;
        await receiverChatHistory.update({
          numUnseenMessages: oldNumUnseen + 1,
        });
      }

      return res.status(httpStatus.CREATED).json({
        data: savedMessage,
      });
    } else {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Content must not be empty",
      });
    }
  } catch (e) {
    console.error(e.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error sending message",
    });
  }
};

chatController.updateOrCreateHistory = async (req, res) => {
  const userId = req.userId;
  const { chatId, lastMessageId } = req.body;
  try {
    let chatHistory = await ChatHistoryModel.find({
      user: userId,
      chat: chatId,
    });
    if (!chatHistory) {
      chatHistory = new ChatHistoryModel({
        user: userId,
        chat: chatId,
        lastSeenMessage: lastMessageId,
      });
      chatHistory = await chatHistory.save();
    } else {
      chatHistory = await chatHistory.update(
        { lastSeenMessage: lastMessageId },
        { new: true }
      );
    }
    return res.status(httpStatus.OK).json({
      data: chatHistory,
    });
  } catch (err) {
    console.error(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error updating chat history",
    });
  }
};

chatController.getChats = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { offset, limit } = await getPaginationParams(req);
    let chats = await ChatModel.find({ member: userId })
      .skip(offset)
      .limit(limit)
      .sort({ updatedAt: -1 })
      .populate({
        path: "member",
        select: "_id username phonenumber avatar blocked_inbox",
        model: "Users",
        populate: {
          path: "avatar",
          select: "_id fileName",
          model: "Documents",
        },
      });

    const latestMessagePromises = chats.map((chat) => {
      const chatId = chat._id;
      return MessagesModel.findOne({ chat: chatId })
        .sort({ createdAt: -1 })
        .exec();
    });

    // get chat histories to check seen status
    const chatHistoryPromises = chats.map((chat) => {
      const chatId = chat._id;
      return ChatHistoryModel.findOne({ chat: chatId, user: userId });
    });

    const latestMessages = await Promise.all(latestMessagePromises);
    const chatHistories = await Promise.all(chatHistoryPromises);

    const chatsWithLatestMessage = chats.map((chat, idx) => {
      const latestMessage = latestMessages[idx];
      let formattedChat = {
        ...chat.toObject(),
        latestMessage: {
          content: latestMessage ? latestMessage.content : null,
          createdAt: latestMessage ? latestMessage.createdAt : null,
        },
        numUnseenMessages: 0,
      };

      const chatHistory = chatHistories[idx];

      if (latestMessage.user != userId && chatHistory) {
        formattedChat = {
          ...formattedChat,
          numUnseenMessages: chatHistory.numUnseenMessages,
        };
      }

      return formattedChat;
    });

    return res.status(httpStatus.OK).json({
      data: chatsWithLatestMessage,
    });
  } catch (e) {
    console.error(e.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error getting chats",
    });
  }
};

chatController.getMessages = async (req, res, next) => {
  let queryChatId, messages;
  const userId = req.userId;

  const { otherUserId, chatId } = req.query;

  if (!otherUserId && !chatId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Other user id or chat id must be provided",
    });
  }

  try {
    if (otherUserId) {
      const existingChat = await ChatModel.findOne({
        member: { $all: [userId, otherUserId] },
      });
      // console.log("existing chat: ", existingChat);
      if (!existingChat) {
        return res.status(httpStatus.NOT_FOUND).json({
          message: "Chat does not exist between 2 users",
        });
      }
      queryChatId = existingChat._id;
    } else if (chatId) {
      queryChatId = chatId;
    }

    const { offset, limit } = await getPaginationParams(req);

    messages = await MessagesModel.find({ chat: queryChatId })
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: "desc" })
      .populate({
        path: "user",
        select: "_id username",
        populate: {
          path: "avatar",
          select: "_id fileName",
          model: "Documents",
        },
        model: "Users",
      });

    // update chat history
    if (messages.length > 0) {
      const latestMsg = messages[0];
      const chatHistory = await ChatHistoryModel.findOne({
        user: userId,
        chat: queryChatId,
      });
      if (
        chatHistory &&
        latestMsg.user != userId &&
        chatHistory.lastSeenMessage != latestMsg._id
      ) {
        console.log("update chat history");
        await chatHistory.update({
          lastSeenMessage: latestMsg._id,
          numUnseenMessages: 0,
        });
      }
    }

    return res.status(httpStatus.OK).json({
      data: messages,
    });
  } catch (e) {
    console.error(e.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error getting messages",
    });
  }
};

chatController.deleteMessage = async (req, res, next) => {
  const { messageId } = req.body;

  const userId = req.userId;

  try {
    const messageToDelete = await MessagesModel.findById(messageId);
    if (!messageToDelete) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Message not found",
      });
    }
    const chatId = messageToDelete.chat;
    const chat = await ChatModel.findById(chatId);
    console.log(chat);
    if (!chat) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Chat not found!",
      });
    }

    const isUserInChat = chat.member.includes(userId);

    if (!isUserInChat) {
      return res.status(httpStatus.FORBIDDEN).json({
        message: "Cannot modify messages of other users!",
      });
    }

    const deletedMessage = await messageToDelete.update({
      isDeleted: true,
    });

    return res.status(httpStatus.OK).json({
      data: deletedMessage,
    });
  } catch (e) {
    console.error(e.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error deleting message",
    });
  }
};

chatController.deleteChat = async (req, res, next) => {
  const userId = req.userId;
  const { chatId } = req.body;

  if (!isValidId(chatId)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Invalid id format",
    });
  }

  try {
    const chat = await ChatModel.findOne({ _id: chatId });
    if (!chat) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Chat not found!",
      });
    }

    const isUserInChat = chat.member.includes(userId);
    if (!isUserInChat) {
      return res.status(httpStatus.FORBIDDEN).json({
        message: "Cannot delete chat of other users!",
      });
    }

    // delete all the messages of the chat first
    await MessagesModel.deleteMany({ chat: chatId });

    // delete the chat
    const deletedChat = await ChatModel.findByIdAndUpdate(chatId, {
      isDeleted: true,
    });
    return res.status(httpStatus.OK).json({
      data: deletedChat,
    });
  } catch (e) {
    console.error(e.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error deleting chat",
    });
  }
};

module.exports = chatController;
