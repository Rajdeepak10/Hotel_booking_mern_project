
import { useFormContext } from 'react-hook-form'
import { hotelFormData } from './ManageHotelForm'

const Guest = () => {
    const{register,formState:{errors}}=useFormContext<hotelFormData>()
  return (
    <div>
        <h2 className='text-3xl font-bold mb-3'>
            Guests
        </h2>
        <div className='grid grid-cols-2 p-6 gap-5 bg-blue-600'>
            <label className='size-sm font-semibold'>Adults
                <input min={1}  className="border rounded w-full py-2 px-3 font-normal"type="number" {...register("adultCount",{
                    required:"This field is Required"
                })}/>
                {errors.adultCount && <span className='text-sm font-bold text-red-500'>{
                errors.adultCount.message
            }</span>}
            </label>
            
            <label className='size-sm font-semibold'>Children
                <input min={0}  className="border rounded w-full py-2 px-3 font-normal"type="number" {...register("childCount",{
                    required:"This field is Required"
                })}/>
                {errors.childCount && <span className='text-sm font-bold text-red-500'>{
                errors.childCount.message
            }</span>}
            </label>
            
        </div>
    </div>
  )
}

export default Guest