import express from 'express'
import {config} from 'dotenv'
import cors from 'cors'
import FriendRouter from './routes/friends.js'

config();

const PORT = process.env.PORT || 4000
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('views'))
app.use('/friends',FriendRouter)
app.listen(PORT, ()=>{
    console.log('http://localhost:'+ PORT);
})