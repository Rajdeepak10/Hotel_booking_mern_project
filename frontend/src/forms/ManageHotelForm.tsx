import { FormProvider, useForm } from "react-hook-form"
import Details from "./Details"
import TypeSection from "./TypeSection"
import Facilities from "./Facilities"
import Guest from "./Guests"
import Images from "./Images"
import { hotelType } from "../../../backend/src/shared/types"
import { useEffect } from "react"
//FormData is built in javaScript object used to create set of key/value pairs
export type hotelFormData = {
    name: string,
    city: string,
    country: string,
    description: string,
    type: string,
    adultCount: number,
    childCount: number,
    facilities: string[],
    pricePerNight: number,
    starRating: number,
    imageFiles:FileList,
    imageUrls: string[],
}
type Props={
    hotel?:hotelType,
    onSave:(hotelData:FormData)=> void,
    isLoading:boolean
}
const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
    const formMethods = useForm<hotelFormData>();
    const { handleSubmit, reset } = formMethods;
  
    useEffect(() => {
      reset(hotel);
    }, [hotel, reset]);

    const onSubmit=handleSubmit((formDataJson:hotelFormData)=>{
        const formData = new FormData();
        if(hotel){
            formData.append("hotelId",hotel._id)
        }
        
        // here we are ccreating a new FormData object
        
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());
        // to send array in formdata
        formDataJson.facilities.forEach((facility,index)=>{
            formData.append(`facilities[${index}]`,facility)
        })
        //on edit hotel page
        if(formDataJson.imageUrls){
            formDataJson.imageUrls.forEach((url,index)=>{
                formData.append(`imageUrls[${index}]`,url)
            })
        }
        // converting fileslist into array first then on add hotel page
        Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
            formData.append(`imageFiles`,imageFile)
        })

        onSave(formData)
    })
    
return (
    <FormProvider {...formMethods}>
        <form onSubmit={onSubmit} className="flex flex-col gap-10">
            <Details/>
            <TypeSection/>
            <Facilities/>
            <Guest/>
            <Images/>
            <span className="flex justify-end">
            <button disabled={isLoading} className="border rounded bg-blue-600 text-white font-bold t p-3 hover:bg-blue-500 disabled:bg-gray-500" type="submit">{isLoading?"saving....":"Save"}</button>
            </span>
        </form>
    </FormProvider>
)
}

export default ManageHotelForm