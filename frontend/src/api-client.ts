// all fetch request of front end is here
import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {HotelSearch, hotelType} from '../../backend/src/shared/types'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// request to send form data to server
// credentials include means we are sending back cookie from server after registration so set up cookie in browser
export const register = async(formData:RegisterFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/users/register`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            "Content-Type":'application/json'
        },
        body: JSON.stringify(formData)
    })
    const responseBody = await response.json()
    if(!response.ok){
        throw new Error(responseBody.message)
    }
}
export const signIn = async (formData:SignInFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/login`,{
        method:'POST',
        credentials:'include',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    })
    const responseBody=await response.json()
    if(!response.ok){
        throw new Error(responseBody.message)
    }
    return responseBody

}
export const signOut = async()=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/logout`,{
        credentials:"include",
        method:"POST",
    })
    if (!response.ok) {
        throw new Error("Error during logout")
        
    }
}
export const addMyHotel = async(hotelData:FormData)=>{
    const response=await fetch(`${API_BASE_URL}/api/my-hotels`,{
        method:"POST",
        credentials:"include",
        body:hotelData
    })
    if(!response.ok){
        throw new Error("Failed to add hotel")
    }
    return response.json()

}
export const fetchMyHotels = async (): Promise<hotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
      credentials: "include",
    });
  
    if (!response.ok) { 
        throw new Error("Error fetching hotels");
    }
  
    return response.json();
  };

  export const fetchMyHotelById = async (hotelId: string): Promise<hotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Error fetching Hotels");
    }
  
    return response.json();
  };


export const updateMyHotel = async (hotelFromData:FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFromData.get("hotelId")}`,{
        method:'PUT',
        body:hotelFromData,
        credentials:'include'
    })
    if (!response.ok) {
        throw new Error("failed to update hotel!")
        
    }
    // .json() method is used to extract json data from response
    return response.json()
}
export type SearchParam = {
    destination?:string,
    checkIn?:string,
    checkOut?:string,
    adultCount?:string,
    childCount?:string,
    page?:string,
    facilities?:string[],
    types?:string[],
    stars?:string[],
    maxPrice?:string,
    sortOption?:string;

}
//Promise<HotelSearch> indicates that it will return a promise that will eventually resolve into a hotelSearch object
export const searchHotel = async (
    searchParams: SearchParam
  ): Promise<HotelSearch> => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");
    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");

    searchParams.facilities?.forEach((facility)=>{
        queryParams.append("facilities",facility)
    })
    searchParams.types?.forEach((type)=>{
        queryParams.append("types",type)
    })
    searchParams.stars?.forEach((star)=>{
        queryParams.append("stars",star)
    })
    const response = await fetch(
        `${API_BASE_URL}/api/hotels/search?${queryParams}`
      );
    if (!response.ok) {
        throw new Error("Error fetching hotel")
        
    }
    return response.json()
}
export const getHotelById=async(hotelId:string):Promise<hotelType>=>{

    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`)
    if(!response.ok){
        throw new Error("Error while fetching")
    }
    return response.json()
}

// checking whether user is loged in or not we will do it by checking cookie which we set up during register functionality

export const validateToken=async()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        credentials:"include"
    })
    if(!response.ok){
        throw new Error("token invalid")
    }
    return response.json()

}