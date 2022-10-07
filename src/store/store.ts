import { applyMiddleware, compose } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { reviewReducer } from './slices/reviewReducer'
import { userReducer } from './slices/userReducer'
import appReducer from './slices/appSlice'
import { productReducer } from './slices/productReducer'
import { shopReducer } from './slices/shopSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore(
  {
    reducer: {
      appModule: appReducer,
      shopModule: shopReducer
      // reviewModule: reviewReducer,
      // userModule: userReducer,
      // productModule: productReducer,
      // shopModule: shopReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: true,

  }
)

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch