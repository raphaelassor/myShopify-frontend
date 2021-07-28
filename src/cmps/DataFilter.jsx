
export const DataFilter=()=>{

    return  <div className="filter flex justify-space-between btn-bar">
    <input type="text" placeholder="i am a filter " />
    <div className="flex">
        <button className="btn-md btn-neutral">Product Vendor</button>
        <button className="btn-md btn-neutral">More Filters</button>
        <button className="btn-md btn-neutral">Saved</button>
        <button className="btn-md btn-neutral"> Sort</button>
    </div>
</div>
}