import { useMemo } from "react"

export const StatusWidget=({product})=>{
    const status=useMemo(()=>{
        if(product.isArchived) return {class:'archive',txt:'Archived'}
        else if(product.isActive) return {class:'active',txt:'Active'}
        return {class:'draft',txt:'Draft'}
    })
    return(
        <div className={`status-widget ${status.class}`}>
            <span>
            {status.txt}
            </span>
        </div>
    )
}