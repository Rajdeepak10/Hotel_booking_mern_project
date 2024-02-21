import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export type SignInFormData = {
    email: string;
    password: string;
}
const SignIn = () => {
    const location = useLocation()
    const queryClient = useQueryClient()
    const Navigate = useNavigate()
    const {showToast}=useAppContext()
    const { register, formState: { errors }, handleSubmit } = useForm<SignInFormData>()
    const mutation = useMutation(apiClient.signIn,{
        onSuccess: async()=>{
            showToast({message:"Logged In successful!",type:"SUCCESS"})
            await queryClient.invalidateQueries("validateToken")
            Navigate(location.state?.from?.pathname || "/")
            // navigate to home page
        },
        onError:(error:Error)=>{
            //show toast
            showToast({message:error.message,type:"ERROR"})
        }
    })
    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data)})

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold">Sign In</h2>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
                    {...register("email", { required: "This field is required" })}
                    type="email"
                    className="border rounded w-full py-1 px-2 font-normal"
                ></input>
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input
                    type="password"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters long",
                        },
                    })}
                ></input>
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>
            <span className="flex items-center justify-between">
                <span className="text-sm">
                    Not registered? <Link className="underline text-blue-800" to="/register">Create an account here</Link>

                </span>
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
                >
                    Sign-In
                </button>
            </span>

        </form>
    )
}

export default SignIn