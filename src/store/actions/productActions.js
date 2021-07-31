import {productService} from '../../services/productService'
import { endLoading, initLoading,setError, unsetGlobalSelected } from './appActions'

export function loadProducts(filterBy){
    return async dispatch=>{
        try{
            const products = await productService.queryProducts(filterBy)
            dispatch(unsetGlobalSelected())
            dispatch({type:'SET_PRODUCTS',products})
        }catch (e){
            setError(e)
        } 
    }
}

export function removeManyProducts(productIds,cbLoadProducts){
    return async dispatch=>{
         await productService.removeManyProductsById(productIds)
         dispatch(cbLoadProducts())
    }
}

export function updateManyProducts(products,cbLoadProducts){
    return async dispatch=>{
        await productService.updateManyProducts(products)
        dispatch(cbLoadProducts())
    }
}


