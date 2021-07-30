import { useDispatch, useSelector } from "react-redux"
import { productService } from "../services/productService"
import { loadProducts } from "../store/actions/productActions"
import {statusNames} from '../services/settings'

export const ProductViewActions = ({ products}) => {
    const dispatch = useDispatch()
    const { filterBy } = useSelector(state => state.productModule)
 
    const onRemoveProducts = async () => {
        const productIds = Object.keys(products)
        await productService.removeManyProductsById(productIds)
        dispatch(loadProducts(filterBy))
    }
    const onAddTags=()=>{

    }
    const onEditStatus=async(statusName)=>{
        for(let productId in products ){
            products[productId].status=statusName
        }
        await productService.updateManyProducts(products)
        dispatch(loadProducts(filterBy))
    }

    return (<>
        <button onClick={onAddTags} className="btn-md btn-neutral">Add Tags </button>
        <button className="btn-md btn-neutral">Remove Tags </button>
        <button onClick={onRemoveProducts} className="btn-md btn-neutral">Delete</button>
        <button onClick={()=>onEditStatus(statusNames.archive)} className="btn-md btn-neutral">Archive</button>
        <button onClick={()=>onEditStatus(statusNames.active)} className="btn-md btn-neutral">Set Active</button>
        <button onClick={()=>onEditStatus(statusNames.draft)}className="btn-md btn-neutral">Set Draft</button>
    </>
    )
}