import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CATEGORIES_ENDPOINT } from '../../env';

export const fetchCategory = createAsyncThunk("productsFilterSlice/fetchCategory", async (categoryId) => {
    const res = await fetch(CATEGORIES_ENDPOINT + '/' + categoryId);
    const data = await res.json();
    return data;
})

const productsFilterSlice = createSlice({
    initialState: '',
    name: "productsFilterSlice",
    reducers: {
        clearFilter: (state, action) => {
            return '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            const filter = action.payload;
            return filter;
        })
    }
})

export const { clearFilter } = productsFilterSlice.actions;

export default productsFilterSlice.reducer;