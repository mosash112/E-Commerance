import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PRODUCTS_ENDPOINT } from '../../env';

export const fetchProducts = createAsyncThunk("productsSlice/fetchProducts", async () => {
    const res = await fetch(PRODUCTS_ENDPOINT);
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

// export const { } = productsSlice.actions;

export default productsSlice.reducer;