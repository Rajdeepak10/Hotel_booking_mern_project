
import { useFormContext } from 'react-hook-form'
import { hotelFormData } from './ManageHotelForm'

const Images = () => {
    const {register,formState:{errors},watch,setValue} = useFormContext<hotelFormData>()
    const existingImages = watch("imageUrls")
    // as by default inside form delfault action of button is to submit form but here we have to change it thatswhy we are specifying here manuaally and preventing default action

    const handleDelete=(event:React.MouseEvent<HTMLButtonElement,MouseEvent>,
    imageUrl:string)=>{
        event.preventDefault();
        setValue("imageUrls",existingImages.filter((url)=>url!==imageUrl))

    }
  return (
    <div>
        <h2 className='text-2xl font-bold mb-2'>
            Images
        </h2>
        <div className='border rounded p-4 flex flex-col gap-4'>
            {existingImages && (
                <div className='grid grid-cols-6 gap-4'>
                    {existingImages.map((url)=>
                    (
                        <div className='relative group'>
                            <img src={url} className='min-h-full object-cover'/>
                            <button onClick={(event)=> handleDelete(event,url)} className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white'>
                                Delete
                            </button>
                        </div>
                    )

                    )}

                </div>
            )}
            <input className='w-full text-gray-700 font-normal' multiple accept="image/*" type="file"{...register("imageFiles",{
                validate:(imageFiles)=>{
                    const totalLength = imageFiles.length + (existingImages?.length||0)
                    if(totalLength===0){
                        return "At least one image is requires"
                    }
                    if (totalLength>6) {
                        return "Select only 6 Images"
                    }
                    return true
                }
            })}/>
        </div>
        {errors.imageUrls && <span className='text-red-500 font-semibold text-sm'>{errors.imageUrls.message}</span>}
    </div>
  )
}

export default Images