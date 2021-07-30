import {productService} from '../../services/productService'
import { endLoading, initLoading,setError } from './systemActions'
export function loadProducts(filterBy){
    return async dispatch=>{
        try{
            const products = await productService.queryProducts(filterBy)
            dispatch({type:'SET_PRODUCTS',products})
            dispatch({type:'SET_SELECTED',selectedData:{}})
            endLoading()
        }catch (e){
            setError(e)
        } 
    }
}

