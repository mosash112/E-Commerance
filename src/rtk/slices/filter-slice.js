import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from '../../env.json';

export const fetchCategory = createAsyncThunk("productsFilterSlice/fetchCategory", async (categoryId) => {
    const res = await fetch('https://my-store-api-eipk.onrender.com/products/categories/' + categoryId);
    const data = await res.json();
    return data;
})

const productsFilterSlice = createSlice({
    initialState: '',
    name: "productsFilterSlice",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            const filter = action.payload;
            return filter;
        })
    }
})

export const { } = productsFilterSlice.actions;

export default productsFilterSlice.reducer;