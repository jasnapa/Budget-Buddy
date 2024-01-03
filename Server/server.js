import express from 'express'



const app = express()


app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))


app.listen(3000,()=>{
    console.log("server running on:3000");
})