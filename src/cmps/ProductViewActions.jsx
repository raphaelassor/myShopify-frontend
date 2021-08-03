import { useDispatch, useSelector } from "react-redux"
import { loadProducts, removeManyProducts, updateManyProducts } from "../store/actions/productActions"
import { TAGS_EDIT_MODAL, ADD_TAGS_MODE, REMOVE_TAGS_MODE, statusNames } from '../services/settings'
import { openModal,closeModal} from "../store/actions/appActions"
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
        for (let productId in products) {
            products[productId].status = statusName
        }
        dispatchUpdate()
    }

    const addTagsToProducts = (tagsToAdd) => {
        //VERIFY ALL TAGS EXIST IN SHOPS. IF NOT - ADD AND PATCH SHOP
        shopService.addTagsToEntities(tagsToAdd, products)
        dispatch(closeModal())
        //HAVE TO LEARN MORE ABOUT CHAINING PROMISES. 
        //I NEED TO KNOW WHEN THE ACTION IS SUCCESSFUL TO CLOSE THE MODAL ONLY THEN
        dispatchUpdate()
    }

    const removeTagsFromProducts = (tagsToRemove) => {
        shopService.removeTagsFromEntities(tagsToRemove, products)
        dispatch(closeModal())
        dispatchUpdate()
    }

    const cbLoadProductsWithFilter = () => {
        return loadProducts(filterBy)
    }
    const dispatchUpdate = () => {
        dispatch(updateManyProducts(products, cbLoadProductsWithFilter))
    }

    return (<>
        <CommonDataActions remove={removeProducts} tags={productTags} 
        addtags={addTagsToProducts} removeTags={removeTagsFromProducts} />
        <button onClick={() => editStatus(statusNames.archive)} className="btn-md btn-neutral">Archive</button>
        <button onClick={() => editStatus(statusNames.active)} className="btn-md btn-neutral">Set Active</button>
        <button onClick={() => editStatus(statusNames.draft)} className="btn-md btn-neutral">Set Draft</button>
    </>
    )
}