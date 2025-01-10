import { Router } from "express";
import { CreateAccount, LoginHandle } from "../controllers/userController.js";


const authRouter = Router()


authRouter.post('/signup', CreateAccount)

authRouter.post('/signin', LoginHandle)

export default authRouter