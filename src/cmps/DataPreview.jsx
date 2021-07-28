import { ProductPreview } from "./ProductPreview"

export const DataPreview=(props)=>{
const {type,entity}=props
    switch(type){
        case 'PRODUCT': return <ProductPreview product={entity} {...props}/>
    }
}