import {shopService} from '../../services/shopService'

export function loadShop(shopId){
    return async dispatch=>{
       const  shop=await shopService.getShopById(shopId)
       dispatch({type:'SET_SHOP',shop})
    }
}

export function updateShop(shop){
    return async dispatch=>{
        const updatedShop=await shopService.updateShop(shop)
        dispatch({type:'UPDATE_SHOP',shop:updatedShop})
    }
}
 