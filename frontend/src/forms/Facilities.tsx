import { useFormContext } from "react-hook-form"
import { hotelFacilities } from "../config/hotel-options-config"
import { hotelFormData } from "./ManageHotelForm"


const Facilities = () => {
    const {register,formState:{errors}}=useFormContext<hotelFormData>()
  return (
    <div>
        <h2 className="text-2xl font-bold mb-3">Facilities</h2>
        <div className="grid grid-cols-5 gap-3">
            {hotelFacilities.map((facilty,index)=>(
                <label key={index} className="text-sm flex gap-1 text-gray-700">
                    <input type="checkbox" value={facilty} {...register("facilities",{
                        validate:(facilities)=>{
                            if(facilities && facilities.length>0){
                                return true
                            }
                            else{
                                return "At least one facility is required"
                            }
                        }
                    })}
                    />
                    {facilty}
                </label>
            ))}

        </div>
        {errors.facilities && <span className="text-sm text-red-500 font-bold">
            {errors.facilities.message}</span>}
    </div>
)
}

export default Facilities