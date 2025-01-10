import UserModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import { configDotenv } from "dotenv"
import jwt from 'jsonwebtoken'

configDotenv()

const SaltRounds = parseInt(process.env.SaltRounds);
const TokenSecret = process.env.TokenSecret;

export const CreateAccount = async (req, res)=>{
    try {
        console.log(req.body);
        console.log(SaltRounds)
        const {name, user_type, phone, address, nid, birth_date, password} = req.body
        bcrypt.hash(password, SaltRounds, async function(err, hash) {
            if(err){
                res.status(500).json({error: "internal server error - Hash"})
            }
            console.log(hash)
            const userModel = new UserModel({name, type: user_type, phone, address, nid, birth_date, password: hash})
            const existance = await UserModel.findOne({phone: userModel.phone})
            if(existance){
                return res.status(400).json({message: "User Already Exist"})
            }
            await userModel.save();
            return res.json({message:"Account Create Successfully", userModel})
        });
        // res.json({message: 'ok'})
    } catch (error) {
        res.status(500).json({error: "internal server error"})
    }
}

export const LoginHandle = async (req, res)=>{
    try {
        const userData = req.body
        console.log(userData)
        const user = await UserModel.findOne({phone: userData.phone})
        console.log(user)
        if(!user){
            return res.status(400).json({message: "User doesn't exist with this phone number", resData: undefined})
        }

        if(bcrypt.compare(userData.password, user.password)){
            let token = jwt.sign(JSON.stringify(user), TokenSecret)
            console.log(token)
            res.status(200).json({message: 'Successfully logged in', resData: {token, user_type: user.type}})
        }else{
            return res.status(400).json({message: "Password doesn't match", resData: undefined})
        }
        // res.json({message: 'ok'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "internal server error"})
    }
}




