import { rateLimit } from "express-rate-limit";
//limiter
export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, 
    message: "Too many requests from this IP, please try again after 15 minutes",
    legacyHeaders: false 
})


//auth limiter
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5, 
    message: "Too many requests from this IP, please try again after 15 minutes",
    legacyHeaders: false 
})