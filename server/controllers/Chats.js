const { PRIVATE_CHAT, GROUP_CHAT } = require("../constants/constants");
const ChatModel = require("../models/Chats");
const MessagesModel = require("../models/Messages");
const ChatHistoryModel = require("../models/ChatHistories");
const DeleteChatArchiveModel = require("../models/DeleteChatArchives");
const UserModel = require("../models/Users");
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

    if (!content) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Content must not be empty",
      });
    }

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
  } catch (e) {
    console.error(e.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error sending message",
    });
  }
};

chatController.getChats = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { offset, limit } = await getPaginationParams(req);

    const deletedChats = await DeleteChatArchiveModel.find({
      deletedBy: userId,
    }).populate("chat");

    const inactiveArchives = deletedChats
      .filter(
        (archive) => archive.chat.latestMessageSentAt <= archive.updatedAt
      )
      .map((archive) => archive.chat._id);

    let chats = await ChatModel.find({
      _id: { $nin: inactiveArchives },
      member: userId,
    })
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
          isDeleted: latestMessage && latestMessage.isDeleted,
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
  let messages, existingChat;
  const userId = req.userId;

  const { otherUserId, chatId } = req.query;

  if (!otherUserId && !chatId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Other user id or chat id must be provided",
    });
  }

  try {
    if (otherUserId) {
      existingChat = await ChatModel.findOne({
        member: { $all: [userId, otherUserId] },
      }).populate({
        path: "member",
        select: "_id blocked_inbox",
        model: "Users",
      });
      if (!existingChat) {
        return res.status(httpStatus.NOT_FOUND).json({
          message: "Chat does not exist between 2 users",
        });
      }
    } else if (chatId) {
      existingChat = await ChatModel.findById(chatId).populate({
        path: "member",
        select: "_id blocked_inbox",
        model: "Users",
      });
      if (!existingChat) {
        return res.status(httpStatus.NOT_FOUND).json({
          message: "Chat does not exist between 2 users",
        });
      }
    }

    const otherUser = existingChat.member.find((m) => m._id != userId);

    const blockedOtherUser = existingChat.member
      .find((m) => m._id == userId)
      .blocked_inbox.includes(otherUser._id);
    const blockedByOtherUser = otherUser.blocked_inbox.includes(userId);

    let fromMessage = null;
    const existingDeleteArchive = await DeleteChatArchiveModel.findOne({
      chat: existingChat._id,
      deletedBy: userId,
    }).populate({
      path: "lastMessageBeforeDelete",
      select: "_id createdAt",
    });

    if (existingDeleteArchive) {
      fromMessage = existingDeleteArchive.lastMessageBeforeDelete;
    }

    const { offset, limit } = await getPaginationParams(req);

    let query = {
      chat: existingChat._id,
    };

    if (fromMessage) {
      query = {
        ...query,
        createdAt: { $gt: fromMessage.createdAt },
      };
    }

    console.log("fetch from message: ", fromMessage);
    console.log("query: ", query);

    messages = await MessagesModel.find(query)
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
        chat: existingChat._id,
      });
      if (
        chatHistory &&
        latestMsg.user != userId &&
        chatHistory.lastSeenMessage != latestMsg._id
      ) {
        await chatHistory.update({
          lastSeenMessage: latestMsg._id,
          numUnseenMessages: 0,
        });
      }
    }

    return res.status(httpStatus.OK).json({
      data: messages,
      blockStatus: {
        blocked: blockedOtherUser,
        isBlocked: blockedByOtherUser,
      },
    });
  } catch (e) {
    console.error(e.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error getting messages",
    });
  }
};

chatController.updateLastSeenMessage = async (req, res) => {
  const userId = req.userId;
  const { messageId, chatId } = req.body;
  const chatHistory = await ChatHistoryModel.findOne({
    user: userId,
    chat: chatId,
  });
  if (chatHistory) {
    await chatHistory.update({
      lastSeenMessage: messageId,
      numUnseenMessages: 0,
    });
  } else {
    const newChatHistory = new ChatHistoryModel({
      user: userId,
      chat: chatId,
      lastSeenMessage: messageId,
      numUnseenMessages: 0,
    });
    await newChatHistory.save();
  }
  return res.status(httpStatus.OK).json({
    message: "Update successfully",
  });
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

    const deletedMessage = await messageToDelete.update(
      {
        isDeleted: true,
      },
      { new: true }
    );

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

  try {
    const chatToDelete = await ChatModel.findOne({ _id: chatId });
    if (!chatToDelete) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Chat not found!",
      });
    }

    const isUserInChat = chatToDelete.member.includes(userId);
    if (!isUserInChat) {
      return res.status(httpStatus.FORBIDDEN).json({
        message: "Cannot delete chat of other users!",
      });
    }

    const latestMessage = await MessagesModel.findOne({ chat: chatId }).sort({
      createdAt: -1,
    });

    if (!latestMessage) {
      return res.status(httpStatus.OK).json({
        data: chatToDelete,
      });
    }

    const existingArchive = await DeleteChatArchiveModel.findOne({
      chat: chatId,
      deletedBy: userId,
    });

    // update or create new delete chat archive
    if (existingArchive) {
      await existingArchive.update({
        lastMessageBeforeDelete: latestMessage._id,
      });
    } else {
      const deleteArchive = new DeleteChatArchiveModel({
        chat: chatId,
        deletedBy: userId,
        lastMessageBeforeDelete: latestMessage._id,
      });
      await deleteArchive.save();
    }

    return res.status(httpStatus.OK).json({
      data: chatToDelete,
    });
  } catch (e) {
    console.error(e.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error deleting chat",
    });
  }
};

module.exports = chatController;
