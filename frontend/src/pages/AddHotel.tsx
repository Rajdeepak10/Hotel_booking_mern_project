
import ManageHotelForm, { hotelFormData } from '../forms/ManageHotelForm'
import { useMutation } from 'react-query'
import { useAppContext } from '../contexts/AppContext'
import * as apiClient from '../api-client'


const AddHotel = () => {
    const {showToast}=useAppContext()
    const {mutate ,isLoading}=useMutation(apiClient.addMyHotel,{
        onSuccess:()=>{
            showToast({message:"Hotel Registration Successfull",type:"SUCCESS"})
        },
        onError:(error:Error)=>{
            showToast({message:error.message,type:"SUCCESS"})

        }
    })
    const handleSave=(hotelData:FormData)=>{
        mutate(hotelData)
    }
    //onSave is used to add custom callback function as a props to child components
return (
    <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>
)
}

export default AddHotel