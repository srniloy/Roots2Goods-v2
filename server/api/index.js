import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
import cors from 'cors'
import authRouter from '../routes/authRouter.js'
import farmerRouter from '../routes/farmerRouter.js'
import traderRouter from '../routes/traderRouter.js'
import wholesalerRouter from '../routes/wholesalerRouter.js'



const app = express()

app.use(cors({origin: "http://192.168.67.82:3000"}))
// app.use(cors())
app.use(bodyParser.json())

configDotenv()

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const MONGO_SERVER_URL = process.env.MONGO_SERVER_URL

app.get('/uploads*', function (req, res) {
    var path = req.params[0] ? req.params[0] : '';
    console.log(path)
    res.sendFile(path, { root: './uploads' });
});

mongoose.connect(MONGO_SERVER_URL)
    .then(() => {
        console.log("Database Connected")
        app.listen(PORT, '0.0.0.0', () => console.log(`Server is runnting at ${PORT}`))
    })
    .catch(error => console.log(error))

app.get('/api', (req, res) => {
    res.json({ user1: "niloy", user2: "toushif", user3: "apu" })
})

app.get('/', (req, res) => {
    res.send("Welcome to the live server!")
})

app.post('/api/create-account', (req, res) => {
    const user = req.body
    console.log(user)

    res.json({ message: "Account Created Successfully", user: user })
})

app.use('/auth', authRouter)
app.use('/farmer', farmerRouter)
app.use('/trader', traderRouter)
app.use('/wholesaler', wholesalerRouter)

export default app