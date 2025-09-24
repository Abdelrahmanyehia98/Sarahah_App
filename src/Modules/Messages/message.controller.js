import { Router } from "express";
import * as messageServices from "./Services/message.service.js";
const router = Router();


router.post("/send/:receiverId", messageServices.sendMessagesService) 
router.get("/get", messageServices.getMessagesService)


export default router;