const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  isLoggedIn: {
    type: Boolean,
    required: true,
    default: false,
  },
});
authSchema.set("timestamps", true);
module.exports = mongoose.model("Auth", authSchema);
