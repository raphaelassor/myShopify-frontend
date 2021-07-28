import {productService} from '../../services/productService'
import { endLoading, initLoading,setError } from './systemActions'
export function loadProducts(filterBy){
    return async dispatch=>{
        try{
            initLoading()
            const products = await productService.query(filterBy)
            dispatch({type:'SET_PRODUCTS',products})
            endLoading()
        }catch (e){
            setError(e)
        } 
    }
}