import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from '../../env.json';

export const fetchProducts = createAsyncThunk("productsSlice/fetchProducts", async () => {
    const res = await fetch('https://my-store-api-eipk.onrender.com/products');
    const data = await res.json();
    return data;
})

const productsSlice = createSlice({
    initialState: [],
    name: "productsSlice",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            const products = action.payload.products;
            return products;
        })
    }
})

export const { } = productsSlice.actions;

export default productsSlice.reducer;