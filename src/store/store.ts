import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import appReducer from './slices/appSlice'
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