import 'dotenv/config'
import express from "express";
import userRouter from "./src/Modules/Users/user.controller.js";
import messageRouter from "./src/Modules/Messages/message.controller.js";
import dbConnection from "./src/DB/db.connection.js";


const app = express();

app.use(express.json());


dbConnection(); 


app.use("/users", userRouter);
app.use("/messages", messageRouter);


// Error handling middleware
app.use(async(error, req, res, next) => {
    console.log("session inside error handling middleware: " , req.session );

    if(req.session && req.session.inTransaction()){

        //abort transaction
        await req.session.abortTransaction()
        //end session
        req.session.endSession()
        return res.status(500).json({ message: "the transaction is aborted" })
    }
    res.status(error.cause||500).json({ message: "something broke!", error: error.message ,stack: error.stack });
});


app.use((req, res) => {
    res.status(404).send("Page Not found!");
});


app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
});

