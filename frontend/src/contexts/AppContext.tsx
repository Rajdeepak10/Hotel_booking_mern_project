import { useContext, useState } from "react";
import React from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from '../api-client'

type ToastMessage={
    message: string;
    type: "SUCCESS"|"ERROR"
}
type AppContext={
    showToast: (toastMessage: ToastMessage)=> void;
    isLoggedIn: boolean
}
// when app load first time context will always be by default undefined



const AppContext = React.createContext<AppContext | undefined>(undefined)

// this is for when we want to provide context to any component of this project
// now showToast is availabe in all front_end compoents
export const AppContextProvider = ({
    children
}:{children: React.ReactNode})=>{

    const [toast,setToast]=useState<ToastMessage | undefined>(undefined)
    const {isError}= useQuery("validateToken",apiClient.validateToken,{
        retry: false,
    })
    return (
        <AppContext.Provider value={{
            showToast:(toastMessage)=> {
                setToast(toastMessage)
            },
            isLoggedIn:!isError
        }}>
            {toast && (<Toast 
            message={toast.message}
            type={toast.type}
            onClose={()=> setToast(undefined)}
            />)}
            {children}
        </AppContext.Provider>
    )
}
// this is custrom hook for if any component wnat to use context
export const useAppContext = ()=>{
    const context = useContext(AppContext)
    return context as AppContext
}