import express from 'express'
import dbConnect from './config/dbConnect.js';
import cookieParser from 'cookie-parser';
import 'dotenv/config.js';
import userRouter from './routes/userRouter.js'



const app = express()

dbConnect()

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use('/',userRouter)

app.listen(3000,()=>{
    console.log("server running on:3000");
})