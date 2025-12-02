import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './config/mongoDB.js';
import connectCloudinary from './config/cloudnairy.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

dotenv.config();

// app config
const app = express()
const port = process.env.PORT || 8000
connectDb()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors()) // used for the connection of Frontend with server

// api endpoint
app.get("/",(req, res)=>{
    res.send("Api Working Successfully")
})

app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)
app.use("/api/user", userRouter)

app.listen(port, ()=>{
    console.log(`Server is Running on Port ${port}`)
})