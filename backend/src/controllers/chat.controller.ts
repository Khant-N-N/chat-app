import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import chatModel from "../models/chat.model";
import messageModel from "../models/message.model";
import { findUser } from "./user.controller";

interface message {
  senderId: string;
  text: string;
  sendAt: Date;
}

interface MesssagePack {
  userIds: string[];
  message: message;
}

type chatMessages = {
  chatId: string;
  messages: message[];
};

export const createChat: RequestHandler = async (req, res, next) => {
  try {
    const { userIds, message } = req.body as MesssagePack;
    userIds.map((id) => {
      if (!mongoose.isValidObjectId(id))
        throw createHttpError(400, "invalid user ID");
    });

    let chat = await chatModel.findOne({ members: { $all: userIds } }).exec();
    if (!chat) {
      chat = await chatModel.create({ members: userIds });
    }

    let chatMessages = await messageModel.findOne({ chatId: chat._id }).exec();
    if (chatMessages) {
      chatMessages.messages.push({
        senderId: message.senderId,
        text: message.text,
        sendAt: message.sendAt || new Date(),
      });
      await chatMessages.save();
    } else {
      chatMessages = await messageModel.create({
        chatId: chat._id,
        messages: [
          {
            senderId: message.senderId,
            text: message.text,
            sendAt: message.sendAt || new Date(),
          },
        ],
      });
    }

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

export const getUserChats: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;
  try {
    if (!mongoose.isValidObjectId(userId))
      throw createHttpError(400, "Invalid user ID.");

    const getChats = await chatModel.find({ members: { $in: userId } }).exec();

    res.status(200).json(getChats);
  } catch (error) {
    next(error);
  }
};

export const getChatMessages: RequestHandler = async (req, res, next) => {
  const chatId = req.params.chatId;
  const limit = 10 as number;
  const startIndex = Number(req.query.startIndex) || 0;
  try {
    if (!mongoose.isValidObjectId(chatId))
      throw createHttpError(400, "invalid user ID.");

    const chatMessages = (await messageModel
      .findOne({ chatId })
      .exec()) as chatMessages;
    if (!chatMessages) throw createHttpError(404, "chat not found.");

    const messages = chatMessages.messages
      .sort((a, b) => b.sendAt.getTime() - a.sendAt.getTime())
      .slice(startIndex, startIndex + limit);

    res
      .status(200)
      .json(messages.sort((a, b) => a.sendAt.getTime() - b.sendAt.getTime()));
  } catch (error) {
    next(error);
  }
};

export const UpdateChatName: RequestHandler = async (req, res, next) => {
  try {
    const { chatname, chatId, newMember } = req.body as {
      chatname?: string;
      chatId: string;
      newMember?: string;
    };
    if (!mongoose.isValidObjectId(chatId))
      throw createHttpError(400, "Invalid chat ID");
    if (newMember && !mongoose.isValidObjectId(newMember))
      throw createHttpError(400, "invalid user ID.");
    const updateChatName = chatname || "";
    const findChat = await chatModel.findByIdAndUpdate(
      chatId,
      {
        chatname: updateChatName,
      },
      { new: true }
    );
    if (!findChat) throw createHttpError(404, "no chat data found.");
    if (newMember) {
      if (!findChat.members.includes(newMember)) {
        findChat?.members.push(newMember);
        findChat.save();
      } else {
        throw createHttpError(400, "This member already exist.");
      }
    }
    res.status(200).json(findChat);
  } catch (error) {
    next(error);
  }
};
