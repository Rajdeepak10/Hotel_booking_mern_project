import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query';
import * as apiClient from '../api-client'
export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: String;
}

const Register = () => {
    const { register,watch,handleSubmit ,formState:{errors}} = useForm<RegisterFormData>();
    // here we are importing all the functions from api-client and passing it to use Mutation as this is used when our fetch request is post or put
    const mutation = useMutation(apiClient.register,{
        onSuccess:()=>{
            console.log("registration is succesfull")
        },
        onError:(error:Error)=>{
            console.log(error.message);
        }

    })

    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data)
    })


    return (
            <form onSubmit={onSubmit}className="flex flex-col gap-5">
                <h2 className="text-3xl font-bold">Create an Account</h2>
                <div className='flex flex-col md:flex-row gap-5'>
                    <label className='text-gray-700 text-sm font-bold flex-1'>
                        First Name
                        <input className='border rounded w-full py-1 px-2 font-normal' {...register("firstName", { required: 'This field is required' })}>
                        </input>
                        {/* if there is any error from firstName then display this span tag */}
                        {errors.firstName && (
                            <span className='text-red-500'>
                                {errors.firstName.message}
                            </span>
                        )}
                    </label>
                    <label className='text-gray-700 text-sm font-bold flex-1'>
                        Last Name
                        <input  {...register("lastName", { required: "This field is required" })} className='border rounded w-full py-1 px-2 font-normal'>
                        </input>
                        {errors.lastName && (
                            <span className='text-red-500'>
                                {errors.lastName.message}
                            </span>
                        )}
                    </label>
                </div>
                <label className='text-gray-700 text-sm font-bold flex-1' >
                    Email
                    <input {...register("email", { required: "This field is required" })}  type="email" className='border rounded w-full py-1 px-2 font-normal'>
                    </input>
                    {errors.email && (
                            <span className='text-red-500'>
                                {errors.email.message}
                            </span>
                        )}
                </label>
                <label className='text-gray-700 text-sm font-bold flex-1' >
                    Password
                    <input type="password" className='border rounded w-full py-1 px-2 font-normal' {...register("password", { required: "This field is required", minLength: {
                        value:8,
                        message: "Password must be at least 8 characters long"
                    }})} >
                    </input>
                    {errors.password && (
                            <span className='text-red-500'>
                                {errors.password.message}
                            </span>
                        )}
                </label>
                <label className='text-gray-700 text-sm font-bold flex-1' >
                    Confirm Password
                    <input {...register("confirmPassword",{
                        validate:(val)=>{
                            if(!val){
                                return "This field is required"
                            }
                            else if (watch("password")!== val){
                                return "Your password do not match"
                            }

                        }
                    })} type="password" className='border rounded w-full py-1 px-2 font-normal'>
                    </input>
                    {errors.confirmPassword && (
                            <span className='text-red-500'>
                                {errors.confirmPassword.message}
                            </span>
                        )}
                </label>
                <span>
                    <button type='submit' className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'>Create Account

                    </button>
                </span>


            </form>
    )
}

export default Register