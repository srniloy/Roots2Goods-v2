import { Router } from "express";
import { CreateAccount, LoginHandle } from "../controllers/userController.js";


const farmerRouter = Router()


// farmerRouter.post('/signup', CreateAccount)

farmerRouter.get('/get-user-data', LoginHandle)

export default farmerRouter