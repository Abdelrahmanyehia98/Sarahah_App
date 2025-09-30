import { Router } from "express";
import * as userServices from "./Services/user.service.js";
import { authenticationMiddleware } from "../../Middlewares/authentication.middleware.js";
import { autraizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { RoleEnum } from "../../Common/enums/user.enum.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import { SignUpSchema } from "../../Validators/Schemas/user.schema.js";
import { authLimiter } from "../../Middlewares/rate-limiter.middleware.js";
import { hostUpload } from "../../Middlewares/multer.middleware.js";
const userRouter = Router();


userRouter.post("/signup",authLimiter,validationMiddleware(SignUpSchema), userServices.signUpService);
userRouter.put("/confirm",authLimiter, userServices.confirmEmailService);
userRouter.post("/signin", userServices.signinService);
userRouter.post("/logout",authenticationMiddleware, userServices.LogoutService);
userRouter.post("/refresh", userServices.RefreshTokenService);
userRouter.post("/auth-gmail", userServices.authServiceWithGmail);
userRouter.delete("/deletExpiredTokens", userServices.deleteExpiredTokensService);


userRouter.put("/update", authenticationMiddleware , userServices.updateAccountService);
userRouter.delete("/delete", authenticationMiddleware ,userServices.deleteAccountService);
userRouter.put("/updatePassword", authenticationMiddleware , userServices.updatePasswordServices);
userRouter.post("/forget-password", authLimiter, userServices.forgetPasswordService);
userRouter.post("/reset-password", userServices.resetPasswordService);
userRouter.post("/upload-profile", authenticationMiddleware, hostUpload({}).single("profile"), userServices.uploadProfileService); 
userRouter.delete("/delete-profile-from-cloudinary", userServices.deleteFromCloudinaryService);



userRouter.get("/list",authenticationMiddleware,autraizationMiddleware([RoleEnum.ADMIN,RoleEnum.SUPER_ADMIN]), userServices.listUsersService);
export default userRouter;


