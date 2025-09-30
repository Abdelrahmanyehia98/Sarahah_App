import { Router } from "express";
import * as messageServices from "./Services/message.service.js";
const MessagesRouter = Router();


MessagesRouter.post("/send/:receiverid", messageServices.sendMessagesService) 
MessagesRouter.get("/get", messageServices.getMessagesService)


export default MessagesRouter;