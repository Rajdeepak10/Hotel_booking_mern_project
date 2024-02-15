import { NextFunction ,Request,Response} from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
// extending request in express
// this is done so that we can set req.userId from our side and return it to front_end or whenever this middleware is called we would have access to user_id of a particular user and we can show result according to that user 
declare global{
    namespace Express{
        interface Request{
            userId: string;
        }
    }
}
const verifyToken = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.cookies["auth_token"]
    if(!token){
        return res.status(401).json({message:'unauthorized'})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY as string)
        //decoded is object containing the claims or info encoded in token
        req.userId=(decoded as JwtPayload).userId
        next();
    } catch (error) {
        return res.status(401).json({message:'unauthorized'})
    }

}
export default verifyToken