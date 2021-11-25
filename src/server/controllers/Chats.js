const {
    PRIVATE_CHAT,
    GROUP_CHAT,
} = require('../constants/constants');
const ChatModel = require("../models/Chats");
const MessagesModel = require("../models/Messages");
const httpStatus = require("../utils/httpStatus");
const { isValidId } = require("../utils/validateIdString");

const chatController = {};
chatController.send = async (req, res, next) => {
    try {
        let userId = req.userId;
        const {
            name,
            chatId,
            receivedId,
            member,
            type,
            content
        } = req.body;
        let chatIdSend = null;
        let chat;
        if (type === PRIVATE_CHAT) {
            if (chatId) {
                console.log(chatId);
                chat = await ChatModel.findById(chatId);
                if (chat !== null) {
                    chatIdSend = chat._id;
                }
            } else {
                chat = new ChatModel({
                   type: PRIVATE_CHAT,
                   member: [
                       receivedId,
                       userId
                   ]
                });
                await chat.save();
                chatIdSend = chat._id;
            }
        } else if (type === GROUP_CHAT) {
            if (chatId) {
                chat = await ChatModel.findById(chatId);
                if (chat !== null) {
                    chatIdSend = chat._id;
                }
            } else {
                chat = new ChatModel({
                    type: GROUP_CHAT,
                    member: member
                });
                await chat.save();
                chatIdSend = chat._id;
            }
        }
        if (chatIdSend) {
            if (content) {
                let message = new MessagesModel({
                    chat: chatIdSend,
                    user: userId,
                    content: content
                });
                await message.save();
                let messageNew = await MessagesModel.findById(message._id).populate('chat').populate('user');
                return res.status(httpStatus.OK).json({
                    data: messageNew
                });
            } else {
                return res.status(httpStatus.OK).json({
                    data: chat,
                    message: 'Create chat success',
                    response: 'CREATE_CHAT_SUCCESS'
                });
            }
        } else {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Not chat'
            });
        }

    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

chatController.getChats = async (req, res, next) => {
    if (req.userId !== req.params.userId) {
        return res.status(httpStatus.FORBIDDEN).json({
            message: 'Cannot get chats of other users!'
        });
    }

    try {
        let chats = await ChatModel.find({member: req.params.userId}).populate({
            path: 'member',
            select: '_id username phonenumber avatar',
            model: 'Users',
            populate: {
                path: 'avatar',
                select: '_id fileName',
                model: 'Documents',
            },
        });

        const latestMessagePromises = chats.map(chat => {
            const chatId = chat._id;
            return MessagesModel.findOne({ chat: chatId }).sort({ createdAt: -1 }).exec(); 
        });

        const latestMessages = await Promise.all(latestMessagePromises);
        
        const chatsWithLatestMessage = chats.map((chat, idx) => {
            const latestMessage = latestMessages[idx];
            return {
                ...chat.toObject(),
                latestMessage: {
                    content: latestMessage.content,
                    createdAt: latestMessage.createdAt
                }
            };
        });

        return res.status(httpStatus.OK).json({
            data: chatsWithLatestMessage
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

chatController.getMessages = async (req, res, next) => {
    try {
        let messages = await MessagesModel.find({
            chat: req.params.chatId
        }).populate('user');
        return res.status(httpStatus.OK).json({
            data: messages
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

chatController.deleteMessage = async (req, res, next) => {
    const {
        messageId,
        chatId,
    } = req.body;

    if (!isValidId(chatId) || !isValidId(messageId)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: 'Invalid message/chat id format'
        });
    }

    const userId = req.userId;
    
    try {
        const chat = await ChatModel.findById(chatId);
        const isUserInChat = chat.member.includes(userId);
        
        if (!chat) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Chat not found!'
            });
        }

        if (!isUserInChat) {
            return res.status(httpStatus.FORBIDDEN).json({
                message: 'Cannot modify messages of other users!'
            });
        }

        const deletedMessage = await MessagesModel.findByIdAndDelete(messageId);
        return res.status(httpStatus.OK).json({
            data: deletedMessage
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

chatController.deleteChat = async (req, res, next) => {
    const userId = req.userId;
    const { chatId } = req.body;

    if (!isValidId(chatId)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: 'Invalid id format'
        });
    }

    try {
        const chat = await ChatModel.findOne({ _id: chatId });
        if (!chat) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Chat not found!'
            });
        }

        const isUserInChat = chat.member.includes(userId);
        if (!isUserInChat) {
            return res.status(httpStatus.FORBIDDEN).json({
                message: 'Cannot delete chat of other users!'
            });
        }

        // delete all the messages of the chat first
        await MessagesModel.deleteMany({ chat: chatId });

        // delete the chat 
        const deletedChat = await ChatModel.findByIdAndDelete(chatId);
        return res.status(httpStatus.OK).json({
            data: deletedChat
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
} 

module.exports = chatController;