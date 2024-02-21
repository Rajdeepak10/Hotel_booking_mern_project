import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from '../api-client'
import { AiFillStar } from "react-icons/ai";
import GuestInfo from "../components/GuestInfo";
const Details = () => {
    // to get hotelid from url
    const {hotelId}=useParams();
    const {data:hotel}=useQuery("fetchHotel",()=> apiClient.getHotelById(hotelId as string),{
        enabled: !!hotelId
    })
    if (!hotel) {
        return<></>
        
    }
    
  return (
    <div className="space-y-6">
        <div>
            <span className="flex">
                {Array.from({length:hotel.starRating}).map(()=>(
                    <AiFillStar/>
                ))}
            </span>
            <h1 className="text-3xl font-bold">
                {hotel.name}
            </h1>
        </div>
        <div className="grid gird-cols-1 lg:gird-cols-3 gap-4">
            {hotel.imageUrls.map((image)=>(
                <div className="h-[300px]">
                    <img src={image} alt={hotel.name} className="rounded-md w-full h-full object-cover object-center"/>
                </div>
            ))}

        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
            {hotel.facilities.map((facility)=>(
                <div className="border border-slate-300 rounded-sm p-3">
                    {facility}
                </div>
            ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
            <div className="whitespace-pre-line">{hotel.description}
            </div>
            <div className="h-fit">
                <GuestInfo pricePerNight={hotel.pricePerNight} hotelId={hotel._id}/>
            </div>

        </div>
    </div>
  )
}

export default Details