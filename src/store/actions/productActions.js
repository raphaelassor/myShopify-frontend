import {productService} from '../../services/productService'
import { endLoading, initLoading,setError, unsetGlobalSelected } from './appActions'

export function loadProducts(filterBy={}){
    return async dispatch=>{
        try{
            dispatch(initLoading())
            const products = await productService.queryProducts(filterBy)
            dispatch(unsetGlobalSelected())
            dispatch({type:'SET_PRODUCTS',products})
            dispatch(endLoading())
            
        }catch (e){
            setError(e)
        } 
    } 
}

export function removeManyProducts(productIds,cbLoadProducts){
    return async dispatch=>{
        dispatch(initLoading())
         await productService.removeManyProductsById(productIds)
         dispatch(cbLoadProducts())
    }
}

export function patchProducts(patch,cbLoadProducts){
    return async dispatch=>{
        dispatch(initLoading())
        await productService.patchProducts(patch)
        dispatch(cbLoadProducts())
    }
}


