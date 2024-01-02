import { createSlice } from "@reduxjs/toolkit";

const collapseSlice = createSlice({
    initialState: 'expand',
    name: "collapseSlice",
    reducers: {
        toggleSidebar: (state, action) => {
            var collapse = 'expand'
            if (action.payload === 'expand')
                collapse = 'collapse'
            else if (action.payload === 'collapse')
                collapse = 'expand'
            return collapse
        }
    }
})

export const { toggleSidebar } = collapseSlice.actions;

export default collapseSlice.reducer;