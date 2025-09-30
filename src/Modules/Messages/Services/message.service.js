import Messages from "../../../DB/Models/messages.model.js"
import User from "../../../DB/Models/user.model.js"

export const sendMessagesService = async(req,res) =>{
    const {content } = req.body
    const {receiverid} = req.params

    const user = await User.findById(receiverid)
    if(!user){
        return res.status(400).json({Message : "user not found"})
    }
    const message = new Messages({
        content,
        receiverid
    })
    await message.save()
    return res.status(200).json({Message : "message sent successfully",message})
}

export const getPublicMessagesService = async (req, res) => {
    const messages = await Messages.find().populate([
        {
            path:"receiverid",
            select: "firstName lastName"
        }
    ])
    return res.status(200).json({ message: "Messages fetched successfully", messages })
}

export const getMyMessagesService = async (req, res) => {
    const { _id } = req.loggedInUser.user;
    const messages = await Messages.find({ receiverid: _id })
    .populate([
        {
            path:"receiverid",
            select: "firstName lastName email"
        }
    ]);
    
    return res.status(200).json({ 
        message: "Your messages fetched successfully", 
        messages 
    });
};