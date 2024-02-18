// create and update their own hotels api
import express,{Request,Response} from "express";
import multer from 'multer'
import cloudinary from 'cloudinary';
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";
import { hotelType } from "../shared/types";
import { body } from "express-validator";
const router = express.Router();
// creating a storage engine that stores files in memory as buffer
const storage=multer.memoryStorage()
// this is upload middleware instance configured to use memory storage for file storage
const upload = multer({
    storage:storage,
    limits:{
        fileSize: 5 * 1024 * 1024 //5MB   
    }
})
//api/my-hotels
router.post('/',verifyToken,[
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be number"),
    body("facilities").notEmpty().withMessage("Facalities are required"),
    body("name").notEmpty().withMessage("Name is required")
],upload.array("imageFiles",6),async(req:Request,res:Response)=>{
        try {
            const imagesFiles=req.files as Express.Multer.File[]
            const newHotel:hotelType = req.body;
            //upload the images to cloudinary
            //
            const uploadPromises = imagesFiles.map(async(image)=>{
                //converting image into base64 buffer string
                const b64 = Buffer.from(image.buffer).toString("base64")
                let dataUrI = "data:"+image.mimetype+";base64,"+b64;
                const res=await cloudinary.v2.uploader.upload(dataUrI)
                return res.url;
            })
            const imageUrls = await Promise.all(uploadPromises)
            //setting image-urls array in newHotel now we can direcly and easily save this data
            newHotel.imageUrls=imageUrls
            newHotel.lastUpdated=new Date()
            //we are getting userId from validatetoken middleware

            newHotel.userId=req.userId;

            const hotel = new Hotel(newHotel)
            await hotel.save()
            res.status(201).json(hotel)

            // if upload was succesful then save new hotel
            
        } catch (error) {
            console.log("error:",error);
            res.status(500).json("Something went wrong")
            
            
        }
})
router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({ userId: req.userId });
        console.log(hotels);
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotels" });
    }
});
export default router

