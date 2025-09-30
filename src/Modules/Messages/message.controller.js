import { Router } from "express";
import * as messageServices from "./Services/message.service.js";
import { authenticationMiddleware } from "../../Middlewares/authentication.middleware.js";
const MessagesRouter = Router();


MessagesRouter.post("/send/:receiverid", messageServices.sendMessagesService) 
MessagesRouter.get("/getPublic", messageServices.getPublicMessagesService)
MessagesRouter.get("/my-messages", authenticationMiddleware, messageServices.getMyMessagesService);

export default MessagesRouter;