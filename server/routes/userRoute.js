import express from "express"
import { getUserProfile, LoginUser, registerUser } from "../controllers/userController.js"
import { authUser } from '../middlewares/authUser.js';

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", LoginUser)
userRouter.get("/get-profile", authUser ,getUserProfile)

export default userRouter