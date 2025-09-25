import { Router } from "express";
import * as userServices from "./Services/user.service.js";
import { authenticationMiddleware } from "../../Middlewares/authentication.middleware.js";
import { autraizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { RoleEnum } from "../../Common/enums/user.enum.js";
const userRouter = Router();


userRouter.post("/signup", userServices.signUpService);
userRouter.put("/confirm", userServices.confirmEmailService)
userRouter.post("/signin", userServices.signinService);
userRouter.post("/logout",authenticationMiddleware, userServices.LogoutService);
userRouter.post("/refresh", userServices.RefreshTokenService)


userRouter.put("/update", authenticationMiddleware , userServices.updateAccountService);
userRouter.delete("/delete", authenticationMiddleware ,userServices.deleteAccountService);
userRouter.put("/updatePassword", authenticationMiddleware , userServices.updatePasswordServices);


userRouter.get("/list",authenticationMiddleware,autraizationMiddleware([RoleEnum.ADMIN,RoleEnum.SUPER_ADMIN]), userServices.listUsersService);
export default userRouter;


