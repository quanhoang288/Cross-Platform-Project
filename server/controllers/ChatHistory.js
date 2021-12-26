const ChatHistoryModel = require("../models/ChatHistories");

const chatHistoryController = {};

chatHistoryController.updateOrCreate = async (req, res) => {
  const userId = req.userId;
  const { chatId, lastMessageId } = req.body;
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
    await chatHistory.save();
  } else {
    chatHistory.update({ lastSeenMessage: lastMessageId });
  }
};

module.exports = chatHistoryController;
