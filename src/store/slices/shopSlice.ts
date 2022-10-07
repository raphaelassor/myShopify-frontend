
/* @ts-ignore */
/* eslint-disable */
import { createSlice, } from '@reduxjs/toolkit'
import { loadShop } from '../actions/shop';

interface ShopState {
    data: {
        id: string,
        title: string,
    },
    isLoading: boolean

}
const initialState: ShopState = {
    data: {
        id: '',
        title: ''
    },
    isLoading: false
};



const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setShop: (state, { payload }) => state = payload
    },
    extraReducers: (builder) => {
        builder.addCase(loadShop.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        }),
            builder.addCase(loadShop.pending, (state) => {
                state.isLoading = true;
            }),
            builder.addCase(loadShop.rejected, (state) => {
                state.isLoading = false;
            })
    }
})

export const { actions: shopActions, reducer: shopReducer } = shopSlice