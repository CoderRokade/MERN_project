import { Router } from "express";
import { varifyToken } from "../utiles/token-maneger.js";
import { chatCompletionValidator, validate } from "../utiles/validators.js";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chats-controllers.js";

//Protected API
const chatRoutes = Router();
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  varifyToken,
  generateChatCompletion
);
chatRoutes.get("/all-chats", varifyToken, sendChatsToUser);
chatRoutes.delete("/delete", varifyToken, deleteChats);

export default chatRoutes;
