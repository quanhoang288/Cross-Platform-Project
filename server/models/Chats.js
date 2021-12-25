const { PRIVATE_CHAT, GROUP_CHAT } = require("../constants/constants");
const mongoose = require("mongoose");

const chatsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  member: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  type: {
    type: String,
    enum: [PRIVATE_CHAT, GROUP_CHAT],
    required: false,
    default: PRIVATE_CHAT,
  },
  latestMessageSentAt: {
    type: mongoose.Schema.Types.Date,
    require: true,
  },
});
chatsSchema.set("timestamps", true);
module.exports = mongoose.model("Chats", chatsSchema);
