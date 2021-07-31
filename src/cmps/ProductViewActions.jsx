import { useDispatch, useSelector } from "react-redux"
import { productService } from "../services/productService"
import { loadProducts, removeManyProducts, updateManyProducts } from "../store/actions/productActions"
import { EDIT_TAGS_MODAL,ADD_TAGS_MODE,REMOVE_TAGS_MODE, statusNames } from '../services/settings'
import { openModal, setModal, unsetGlobalSelected } from "../store/actions/appActions"
import { shopService } from "../services/shopService"

export const ProductViewActions = ({ products }) => {
    const dispatch = useDispatch()
    const { filterBy } = useSelector(state => state.productModule)
    // TODO : ADD THE PRODUCT TAGS MAP FROM SHOP AND TEST THE ADDING AND REMOVING
    const removeProducts = async () => {
        const productIds = Object.keys(products)
        dispatch(removeManyProducts(productIds, cbLoadProductsWithFilter))
    }

    const openEditTagsModal = (mode) => {
        const props = mode === REMOVE_TAGS_MODE ?
            createPropsForTagsModal(removeTagsFromProducts, REMOVE_TAGS_MODE) :
            createPropsForTagsModal(addTagsToProducts, ADD_TAGS_MODE)
        openModal(EDIT_TAGS_MODAL, props)
    }
    const editStatus = async (statusName) => {
        for (let productId in products) {
            products[productId].status = statusName
        }
        dispatchUpdate()
    }

    const addTagsToProducts = (tagsToAdd) => {
        shopService.addTagsToEntities(tagsToAdd, products)
        dispatchUpdate()
    }

    const removeTagsFromProducts = (tagsToRemove) => {
        shopService.removeTagsFromEntities(tagsToRemove, products)
        dispatchUpdate()
    }

    const cbLoadProductsWithFilter = () => {
        return loadProducts(filterBy)
    }
    const createPropsForTagsModal = (funcToCall, mode) => {
        const props = {
            updateTags(tagsToUpdate) {
                funcToCall(tagsToUpdate)
            },
            mode,
            // tags: productTags
        }
        return props
    }
    const dispatchUpdate = () => {
        dispatch(updateManyProducts(products, cbLoadProductsWithFilter))
    }

    return (<>
        <button onClick={() => openEditTagsModal(ADD_TAGS_MODE)} className="btn-md btn-neutral">Add Tags </button>
        <button onClick={openEditTagsModal(REMOVE_TAGS_MODE)} className="btn-md btn-neutral">Remove Tags </button>
        <button onClick={removeProducts} className="btn-md btn-neutral">Delete</button>
        <button onClick={() => editStatus(statusNames.archive)} className="btn-md btn-neutral">Archive</button>
        <button onClick={() => editStatus(statusNames.active)} className="btn-md btn-neutral">Set Active</button>
        <button onClick={() => editStatus(statusNames.draft)} className="btn-md btn-neutral">Set Draft</button>
    </>
    )
}