import express,{Request,Response} from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator'
import User from '../models/user'
import verifyToken from '../middleware/auth'
const router = express.Router()



router.post("/login",[
    check("email","email is required").isEmail(),
    check("password","password is required").isLength({
        min:1
    })
],async (req:Request,res:Response)=>{
    const errors=validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({'message':errors.array()})

    }
    const {email,password}=req.body
    try {
        const user = await User.findOne({
            email:email,
        })
        if (!user) {
            return res.status(400).json({message:"User does not exist"})  
        }
        const password_verify= await bcrypt.compare(password,user.password)
        if (!password_verify) {
            return res.status(400).json({message:"Password does not match"})
        }
        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET_KEY as string,{
            expiresIn:'1d'
        })
        res.cookie("auth_token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV==='production',
            maxAge:86400000
        })
        res.status(200).json({userId:user._id})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Something went Wrong"
        })
        
        
    }
})
// verify-token is middleware which check http cookie send by front end
router.get('/validate-token',verifyToken,(req:Request,res:Response)=>{
    res.status(200).send({userId: req.userId})

})
export default router

router.post('/logout',(req:Request,res:Response)=>{
    res.cookie("auth_token","",{
        expires: new Date(0)
    })
    res.send()
})
