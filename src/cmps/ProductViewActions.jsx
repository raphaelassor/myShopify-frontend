import { useDispatch, useSelector } from "react-redux"
import { loadProducts, removeManyProducts, patchProducts } from "../store/actions/productActions"
import {  statusNames } from '../services/settings'
import { closeDialog} from "../store/actions/appActions"
import { shopService } from "../services/shopService"
import { CommonDataActions } from "./CommonDataActions"

export const ProductViewActions = ({ products }) => {
    const dispatch = useDispatch()
    const { filterBy } = useSelector(state => state.productModule)
    const {productTags} = useSelector(state => state.shopModule)
    
    const removeProducts = async () => {
        const productIds = Object.keys(products)
        dispatch(removeManyProducts(productIds, cbLoadProductsWithFilter))
    }
   
    const editStatus = async (statusName) => {
       const patch={
           ids:products.map(product=>product._id),
           status:statusName
       }
        dispatchUpdate(patch)
    }

    // const addTagsToProducts = (tagsToAdd) => {
    //     //VERIFY ALL TAGS EXIST IN SHOPS. IF NOT - ADD AND PATCH SHOP
    //     // shopService.addTagsToEntities(tagsToAdd, products)
    //     // dispatchUpdate()
    //     // dispatch(closeDialog())
    //     patchTags(tagsToAdd,'add')
    // }

    // const removeTagsFromProducts = (tagsToRemove) => {
    //     patchTags(tagsToRemove,'remove')
    // }

    // const patchTags=(tags,action)=>{
    //     const patch={
    //         ids:products.map(product=>product._id),
    //         tags,
    //         action
    //     }
    //     dispatchUpdate(patch)
    //     dispatch(closeDialog())
    // }

    const cbLoadProductsWithFilter = () => {
        return loadProducts(filterBy)
    }
    const dispatchUpdate = (patch) => {
        dispatch(patchProducts(patch, cbLoadProductsWithFilter))
    }

    return (<>
        <CommonDataActions remove={removeProducts} tags={productTags} 
        update={dispatchUpdate} entities={products}/>
        <button onClick={() => editStatus(statusNames.archive)} className="btn-md btn-neutral">Archive</button>
        <button onClick={() => editStatus(statusNames.active)} className="btn-md btn-neutral">Set Active</button>
        <button onClick={() => editStatus(statusNames.draft)} className="btn-md btn-neutral">Set Draft</button>
    </>
    )
}