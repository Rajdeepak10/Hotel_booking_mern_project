import { useMutation, useQueryClient } from "react-query"
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext"
const SignOutButton = () => {
    const queryClient = useQueryClient()
    const {showToast}=useAppContext()
    const Mutation = useMutation(apiClient.signOut,{
        onSuccess: async()=>{
            await queryClient.invalidateQueries("validateToken")
            showToast({message:"SIgned Out!",type:"SUCCESS"})


            //show toast
        },
        onError:(error:Error)=>{
            showToast({message:error.message,type:'ERROR'})
            //show toast
        }
    })

    const onClick=()=>{
        Mutation.mutate()
    }
  return (
    <button onClick={onClick}className="text-blue-800 px-3  bg-white font-bold hover:bg-gray-100">Sign Out</button>
  )
}

export default SignOutButton