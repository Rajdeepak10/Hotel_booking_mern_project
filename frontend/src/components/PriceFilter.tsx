type Props={
    selectedPrice?:number;
    onChange:(value?:number)=>void

}
const PriceFilter = ({selectedPrice,onChange}:Props) => {
  return (
    <div className="">
        <h4 className="text-md font-semibold mb-2">
            Max Price </h4>
        <select value={selectedPrice} onChange={(event)=>(onChange(event.target.value ? parseInt(event.target.value):undefined))} >
            <option value="">Select Max price</option>
            {["1000","2000","5000","10000","20000"].map((value)=>(
                <option value={value}>
                    <label htmlFor="
                    ">{value}</label>
                </option>
            ))}
        </select>
    </div>
  )
}

export default PriceFilter