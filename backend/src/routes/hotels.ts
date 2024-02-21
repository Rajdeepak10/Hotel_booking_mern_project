import express, { Request, Response, query } from 'express'
import { param, validationResult } from 'express-validator'
import Hotel from '../models/hotel'
import { HotelSearch } from '../shared/types'
import { ifError } from 'assert'
const router = express.Router()

router.get('/search', async (req: Request, res: Response) => {
    try {
        const query = constructSearchQuery(req.query)
        let sortOptions = {
        }
        switch (req.query.sortOption) {
            case "starRating":
                sortOptions = { starRating: -1 }
                break;
            case "pricePerNightAsc":
                sortOptions = { pricePerNight: 1 };
                break;
            case "pricePerNightDesc":
                sortOptions = { pricePerNight: -1 }
                break;
        }
        const page_size = 4
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
        const skip_hotel = (pageNumber - 1) * page_size
        //adding pagination

        const hotels = await Hotel.find(query).sort(sortOptions).skip(skip_hotel).limit(page_size);
        const total = await Hotel.countDocuments(query)
        const response: HotelSearch = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / page_size)
            }
        }
        
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" })
    }
})
router.get('/:id',[
    param("id").notEmpty().withMessage("Hotel ID is required")
],async (req:Request,res:Response)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({errors: errors.array()})
    }
    const id = req.params.id.toString()
    try {
        const hotel = await Hotel.findById(id)
        console.log(hotel)
        res.json(hotel)

        
    } catch (error) {
        res.status(500).json({message:"error fetching hotel"})
        
    }

})
const constructSearchQuery = (queryParams: any) => {
    const constructQuery: any = {}
    if (queryParams.destination) {
        constructQuery.$or = [
            { city: new RegExp(queryParams.destination, "i") },
            { country: new RegExp(queryParams.destination, "i") },
        ];
    }
    if (queryParams.adultCount) {
        constructQuery.adultCount = {
            $gte: parseInt(queryParams.adultCount)
        }
    }
    if (queryParams.childCount) {
        constructQuery.childCount = {
            $gte: parseInt(queryParams.childCount)
        }
    }
    if (queryParams.facilities) {
        constructQuery.facilities = {
          $all: Array.isArray(queryParams.facilities)
            ? queryParams.facilities
            : [queryParams.facilities],
        };
      }
    if (queryParams.types) {
        constructQuery.type={
            $in: Array.isArray(queryParams.types) ?
            queryParams.types : [queryParams.types]
        }
        
    }
    if (queryParams.stars) {
        const rating = Array.isArray(queryParams.stars) ? queryParams.stars.map((star: string) => parseInt(star)) : parseInt(queryParams.stars)
        constructQuery.starRating = { $in: rating }
    }
    if (queryParams.maxPrice) {
        constructQuery.pricePerNight = {
            $lte: parseInt(queryParams.maxPrice).toString()
        }
    }
    return constructQuery
}
export default router