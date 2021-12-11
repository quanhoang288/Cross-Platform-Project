const chatController = require("../controllers/Chats");
const {asyncWrapper} = require("../utils/asyncWrapper");
const express = require("express");
const chatsRoutes = express.Router();
const auth = require("../middlewares/auth");

chatsRoutes.post(
    "/send",
    auth,
    asyncWrapper(chatController.send),
);

chatsRoutes.get(
    "/getMessages",
    auth,
    asyncWrapper(chatController.getMessages),
);

chatsRoutes.get(
    "/getChats/:userId",
    auth,
    asyncWrapper(chatController.getChats),
);

chatsRoutes.post(
    "/deleteChat",
    auth,
    asyncWrapper(chatController.deleteChat)
);

chatsRoutes.post(
    "/deleteMessage",
    auth,
    asyncWrapper(chatController.deleteMessage)
);



module.exports = chatsRoutes;