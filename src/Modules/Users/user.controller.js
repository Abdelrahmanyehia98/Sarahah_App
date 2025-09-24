import { Router } from "express";
import * as userServices from "./Services/user.service.js";
import { authenticationMiddleware } from "../../Middlewares/authentication.middleware.js";
const userRouter = Router();


userRouter.post("/signup", userServices.signUpService);
userRouter.put("/confirm", userServices.confirmEmailService)
userRouter.post("/signin", userServices.signinService);
userRouter.post("/logout",authenticationMiddleware, userServices.LogoutService);
userRouter.put("/update", authenticationMiddleware , userServices.updateAccountService);
userRouter.delete("/delete", authenticationMiddleware ,userServices.deleteAccountService);
userRouter.get("/list", userServices.listUsersService);
userRouter.post("/refresh", userServices.RefreshTokenService)
userRouter.put("/updatePassword", authenticationMiddleware , userServices.updatePasswordServices);

export default userRouter;


