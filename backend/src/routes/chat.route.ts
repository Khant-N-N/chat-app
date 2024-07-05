import express from "express";
import * as chatControllers from "../controllers/chat.controller";

const router = express.Router();

router.get("/chat", chatControllers.getUserChats);
router.post("/chat", chatControllers.createChat);
router.get("/chat/messages/:chatId", chatControllers.getChatMessages);
router.put("/chat", chatControllers.UpdateChatName);

export default router;
