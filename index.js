import 'dotenv/config'
import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRouter from "./src/Modules/Users/user.controller.js";
import messageRouter from "./src/Modules/Messages/message.controller.js";
import dbConnection from "./src/DB/db.connection.js";
import { generalLimiter , authLimiter } from './src/Middlewares/rate-limiter.middleware.js';


const app = express();

app.use(express.json());

// Some CORS options
const whitelist = process.env.WHITE_LISTED_ORIGINS || [];
const corsOptions = {
    origin: function (origin, callback) {
        console.log("origin: ", origin);
        
        if ( !origin || whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// Use some Security middlewares
app.use(cors(corsOptions))
app.use(generalLimiter)
app.use(helmet())

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

