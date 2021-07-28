import { combineReducers } from 'redux'
import { reviewReducer } from './reviewReducer'
import { userReducer } from './userReducer'
import { systemReducer } from './systemReducer'
import { productReducer } from './productReducer'

export const rootReducer = combineReducers({
  systemModule: systemReducer,
  reviewModule: reviewReducer,
  userModule: userReducer,
  productModule:productReducer,
})
