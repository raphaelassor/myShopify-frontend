import { combineReducers } from 'redux'
import { reviewReducer } from './reviewReducer'
import { userReducer } from './userReducer'
import {appReducer} from './appSlice'
import { productReducer } from './productReducer'
import { shopReducer } from './shopSlice'

export const rootReducer = combineReducers({
  appModule: appReducer,
  reviewModule: reviewReducer,
  userModule: userReducer,
  productModule:productReducer,
  shopModule:shopReducer
})
