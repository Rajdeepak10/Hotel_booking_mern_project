import express from "express"
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import userRoutes from './routes/users'
import authRoutes from "./routes/auth"
const app=express()
//automatically convert api request body into json format
app.use(express.json())
// tell express to use urlencoded middleware which is used to parse incoming requeest body in url-encoded format and make them availabe in 'req.body object of route hanclers 
app.use(express.urlencoded({extended: true}))
app.use(cors())



// connection to mongodb
// we are assuring typescript that URl is definately a string and it allow us to pass it to mongoose
//
if (process.env.MONGO_CONNECTION_STRING) {
    mongoose.connect(process.env.MONGO_CONNECTION_STRING)   
}



app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)


app.listen(3000,()=>{
    console.log("server is running on localhost:3000");
    
})