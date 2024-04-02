import { Router } from "express";
import { createNewChat, deleteChatById, getChatById, getChats } from "../controllers/chatbot.controller";

const router = Router();

router.get('/chats', getChats)

router.post('/chats', createNewChat)

router.get('/chats/:id', getChatById)

router.delete('/chats/:id', deleteChatById)

export default router