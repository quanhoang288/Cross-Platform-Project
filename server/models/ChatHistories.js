const mongoose = require("mongoose");

const chatHistoriesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chats",
  },
  lastSeenMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Messages",
  },
  numUnseenMessages: {
    type: Number,
    default: 0,
  },
});
chatHistoriesSchema.set("timestamps", true);
module.exports = mongoose.model("ChatHistories", chatHistoriesSchema);
