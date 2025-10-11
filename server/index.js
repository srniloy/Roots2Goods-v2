import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
import cors from 'cors'

import authRouter from './routes/authRouter.js'
import farmerRouter from './routes/farmerRouter.js'
import traderRouter from './routes/traderRouter.js'
import wholesalerRouter from './routes/wholesalerRouter.js'

configDotenv()

const app = express()

app.use(cors({ origin: "https://roots2goods.vercel.app" }))
app.use(bodyParser.json())

const MONGO_SERVER_URL = process.env.MONGO_SERVER_URL
if (!mongoose.connection.readyState) {
    mongoose.connect(MONGO_SERVER_URL)
        .then(() => console.log("Database Connected"))
        .catch(error => console.error(error))
}

app.get('/uploads*', (req, res) => {
    const path = req.params[0] ? req.params[0] : ''
    res.sendFile(path, { root: './uploads' })
})

app.get('/', (req, res) => {
    res.send("Welcome to the live server!")
})

app.get('/api', (req, res) => {
    res.json({ user1: "niloy", user2: "toushif", user3: "apu" })
})

app.post('/api/create-account', (req, res) => {
    const user = req.body
    console.log(user)
    res.json({ message: "Account Created Successfully", user })
})

app.use('/auth', authRouter)
app.use('/farmer', farmerRouter)
app.use('/trader', traderRouter)
app.use('/wholesaler', wholesalerRouter)

export default (req, res) => app(req, res)
