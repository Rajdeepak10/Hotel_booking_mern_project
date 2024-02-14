import { useForm } from 'react-hook-form'
type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: String;
}

const Register = () => {
    const { register } = useForm<RegisterFormData>();


    return (
        <>
            <form className="flexx flex-col gap-5">
                <h2 className="text-3xl font-bold">Create an Account</h2>
                <div className='flex flex-col md:flex-row gap-5'>
                    <label className='text-gray-700 text-sm font-bold flex-1'>
                        First Name
                        <input className='border rounded w-full py-1 px-2 font-normal' {...register("firstName", { required: 'This field is required' })}>
                        </input>
                    </label>
                    <label className='text-gray-700 text-sm font-bold flex-1' {...register("lastName", { required: "This field is required" })}>
                        Last Name
                        <input className='border rounded w-full py-1 px-2 font-normal'>
                        </input>
                    </label>
                </div>
                <label className='text-gray-700 text-sm font-bold flex-1' {...register("email", { required: "This field is required" })}>
                    email
                    <input type="email" className='border rounded w-full py-1 px-2 font-normal'>
                    </input>
                </label>
                <label className='text-gray-700 text-sm font-bold flex-1' {...register("password", { required: "This field is required" })}>
                    Password
                    <input type="password" className='border rounded w-full py-1 px-2 font-normal'>
                    </input>
                </label>
                <label className='text-gray-700 text-sm font-bold flex-1' {...register("confirmPassword", { required: "This field is required" })}>
                    Confirm Password
                    <input type="password" className='border rounded w-full py-1 px-2 font-normal'>
                    </input>
                </label>


            </form>
        </>
    )
}

export default Register