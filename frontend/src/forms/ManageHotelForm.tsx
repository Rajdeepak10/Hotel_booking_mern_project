import { FormProvider, useForm } from "react-hook-form"
import Details from "./Details"
import TypeSection from "./TypeSection"
import Facilities from "./Facilities"
import Guest from "./Guests"
import Images from "./Images"
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
    onSave:(hotelData:FormData)=> void,
    isLoading:boolean
}
const ManageHotelForm = ({onSave,isLoading}:Props) => {
    const formMethods = useForm<hotelFormData>()
    const {handleSubmit}=formMethods
    const onSubmit=handleSubmit((formDataJson:hotelFormData)=>{
        console.log(formDataJson);
        
        // here we are ccreating a new FormData object
        const formData = new FormData();
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
        // converting fileslist into array first then 
        Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
            formData.append(`imageFiles`,imageFile)
        })
        console.log(formData);
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