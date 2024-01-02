import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategory = createAsyncThunk("productsFilterSlice/fetchCategory", async (categoryId) => {
    const res = await fetch('http://localhost:9000/products/categories/'+categoryId);
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