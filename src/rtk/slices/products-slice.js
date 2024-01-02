import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("productsSlice/fetchProducts", async () => {
    const res = await fetch('http://localhost:9000/products');
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