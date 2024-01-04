import express from 'express'
import dbConnect from './config/dbConnect.js';
import cookieParser from 'cookie-parser';
import 'dotenv/config.js';
import userRouter from './routes/userRouter.js'
import cors from 'cors'


const app = express()

app.use(
    cors({
      origin: [
        "http://localhost:5000",
      ],
      credentials: true,
    })
  );

dbConnect()

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use('/',userRouter)

app.listen(3000,()=>{
    console.log("server running on:3000");
})