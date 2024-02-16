import express from "express"
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import userRoutes from './routes/users'
import authRoutes from "./routes/auth"
import cookieParser from 'cookie-parser'
import path from 'path'
const app=express()
//automatically convert api request body into json format
app.use(express.json())
// tell express to use urlencoded middleware which is used to parse incoming requeest body in url-encoded format and make them availabe in 'req.body object of route hanclers 
app.use(express.urlencoded({extended: true}))
// allowed origins that are allowed to access resources from the server and credential true means server allows credentials(cookies) to be sent cross-origin requests
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true
}))



// connection to mongodb
// we are assuring typescript that URl is definately a string and it allow us to pass it to mongoose

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
// .then(()=>{
//     console.log("Connected to database:",process.env.MONGODB_CONNECTION_STRING);
// })
//this is used to serve static files of frontend
// whenever search comes for these files express will search those search in this dir
//path.join() used to construct absultate path
app.use(express.static(path.join(__dirname,"../../frontend/dist")))


app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)

app.listen(3000,()=>{
    console.log("server is running on localhost:3000");
    
})