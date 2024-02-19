import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import * as apiClient from '../api-client'
import ManageHotelForm from "../forms/ManageHotelForm"
import { useAppContext } from "../contexts/AppContext"
const EditHotel = () => {
    // here we are fetching userid from url
    const {hotelId}=useParams()
    const {showToast}=useAppContext()

    const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );
  const {mutate,isLoading}=useMutation(apiClient.updateMyHotel,{
    onSuccess:()=>{
      showToast({message:"hotel save",type:'SUCCESS'})
    },
    onError:()=>{
      showToast({message:"Error Saving Hotel",type:"ERROR"})
    }
  })
  
  const handleSave=(hotelFormData:FormData)=>{
    mutate(hotelFormData)
  }
  return (
    <ManageHotelForm isLoading={isLoading} onSave={handleSave} hotel={hotel}/>
  );
}

export default EditHotel;