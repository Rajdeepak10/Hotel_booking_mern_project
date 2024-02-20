type Props={
    selectedSort?:string,
    onChange:(value?:string)=>void
}
const SortFilter = ({selectedSort,onChange}:Props) => {
  return (
    <select value={selectedSort} onChange={(event)=>onChange(event.target.value?event.target.value.toString():undefined)}>
        <option value=""> Select Sorting Order</option>
        {["starRating","pricePerNightAsc","pricePerNightDesc"].map((sort)=>(
                <option value={sort}>
                    <label>{sort}</label>
                </option>
        ))}

    </select>
    
  )
}

export default SortFilter