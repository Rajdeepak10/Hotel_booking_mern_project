
import { useFormContext } from 'react-hook-form'
import { hotelFormData } from './ManageHotelForm'

const Images = () => {
    const {register,formState:{errors}} = useFormContext<hotelFormData>()
  return (
    <div>
        <h2 className='text-2xl font-bold mb-2'>
            Images
        </h2>
        <div className='border rounded p-4 flex flex-col gap-4'>
            <input className='w-full text-gray-700 font-normal' multiple accept="image/*" type="file"{...register("imageFiles",{
                validate:(imageFiles)=>{
                    const totalLength = imageFiles.length
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