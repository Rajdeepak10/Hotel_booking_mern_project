import express, {Request,Response} from "express"
import User from "../models/user";
import {check, validationResult} from 'express-validator'
import { log } from "console";
import jwt from 'jsonwebtoken'
// creating a router object ehich can be used to define routes for different http methods
const router = express.Router();




export default router.post("/register",[
    check("firstName","First name is required").isString(),
    check("lastName","Last name is required").isString(),
    check("email","Email is required").isEmail(),
    check("password","Password with 8 or more character required").isLength({
        min: 8
    }),
],
async(req:Request,res:Response)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({message: errors.array()})
    }
    try {
        let user = await User.findOne({
            email: req.body.email
        })
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })  
        }
        user = new User(req.body)
        await user.save()
        const token = jwt.sign({userId:user.id},process.env.JWT_SECRET_KEY as string,{
            expiresIn: '1d'
        })
        res.cookie('auth_token',token,{
            httpOnly: true,
            secure:process.env.NODE_ENV==='production',
            maxAge: 86400000
        })
        return res.status(200).send({message: "Ok"})
    } catch (error) {
        console.log(error);
        // we always try to return generic error to front_end and specific error only limited to back_end to avoid losing info
        res.status(500).send({message:"Something went wrong"})
    }
})