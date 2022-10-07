import { shopService } from "../../services/shopService";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Shop } from "../../services/types";


export const loadShop = createAsyncThunk<Shop, string>('shop/loadShop', async (shopId: string) => {
    const { data } = await shopService.getShopById(shopId);
    return data as Shop
})