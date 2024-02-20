
import { useQuery } from 'react-query'
import * as apiClient from '../api-client'
import { useSearchContext } from '../contexts/SearchContext'
import { useState } from 'react'
import SearchResultCard from '../components/SearchResultCard'
import Pagination from '../components/Pagination'
import StarRatingFilter from '../components/StarRatingFilter'
import HotelTypeFilter from '../components/HotelTypeFilter'
import FacilitiesFilter from '../components/FacilitiesFilter'
import PriceFilter from '../components/PriceFilter'
import SortFilter from '../components/SortFilter'
const Search = () => {
    const [page,setPage]=useState<number>(1)
    const [selectedStars,setSelectedStars]=useState<string[]>([])
    const [selectedType,setSelectedType]=useState<string[]>([])
    const [selectedFacilities,setSelectedFacilities]=useState<string[]>([])
    const [maxSelectedPrice,setMaxSelectedPrice]=useState<number | undefined>()
    const [selectedSort,setSelectedSort]=useState<string | undefined>()


    const search = useSearchContext()
    const searchParams={
        destination:search.destination,
        checkIn:search.checkIn.toISOString(),
        checkOut:search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page:page.toString(),
        stars:selectedStars,
        types:selectedType,
        facilities:selectedFacilities,
        maxPrice:maxSelectedPrice?.toString(),
        sortOption:selectedSort
    }
    //second parameter in useQuery is dependency array as soon as searchParams changes this query will automatically execute with changes searchParams
    const {data:hotelData}=useQuery(["searchHotels",searchParams],()=>(
        apiClient.searchHotel(searchParams)
    ))

    const handleSelectedFacilities=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const hotelFacilty = event.target.value
        setSelectedFacilities((prevFacilities)=>
        event.target.checked?[...prevFacilities,hotelFacilty]:prevFacilities.filter((facilty)=>facilty !== hotelFacilty)
        )
    }
    const handleTypeChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const HotelType=event.target.value 
        setSelectedType((prevType)=>
        event.target.checked?[...prevType,HotelType]:prevType.filter((type)=>(type !== HotelType)))

    }
    const handleStarChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const starRating = event.target.value
        setSelectedStars((prevStars)=>
        event.target.checked?[...prevStars,starRating]:prevStars.filter((star)=> star !== starRating))

    }
    
    return (
        <>
        <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
            {/* filter div this grid-cols-[250px-1fr] means divide into 2 side one with 250px and rest col with rest space for large device*/}
            <div className='rounded-lg border border-slate-300 p-5 h-fit sticky top-10'>
                <div className='space-y-5'>
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                        Filer By:
                    </h3>
                    <StarRatingFilter selectedStars={selectedStars} onChange={handleStarChange} />
                    <HotelTypeFilter selectedTypes={selectedType} onChange={handleTypeChange}/>
                    <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleSelectedFacilities}/>
                    <PriceFilter selectedPrice={maxSelectedPrice} onChange={(value?:number)=>setMaxSelectedPrice(value)}/>
                </div>
            </div>
            <div className='flex flex-col gap-5'>
                <div className='flex justify-between items-center'>
                    <span className='text-xl font-bold'>
                        {hotelData?.pagination.total} hotels found
                        {search.destination ? ` in ${search.destination}`:""}
                    </span>
                    <SortFilter selectedSort={selectedSort} onChange={(value?:string)=>setSelectedSort(value)}/>
                </div>
                {hotelData?.data.map((hotel)=>(
                        <SearchResultCard hotel={hotel}></SearchResultCard>
                    ))}
                <div>
                    <Pagination page={hotelData?.pagination.page || 1} pages={hotelData?.pagination.pages || 1} onPageChange={(page)=>setPage(page)}/>
                </div>
            </div>

            

        </div>
        </>
        
)
}

export default Search