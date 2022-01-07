const mongoose = require("mongoose");

const deleteChatArchiveSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chats",
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  lastMessageBeforeDelete: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Messages",
  },
});
deleteChatArchiveSchema.set("timestamps", true);
module.exports = mongoose.model("DeleteChatArchives", deleteChatArchiveSchema);
