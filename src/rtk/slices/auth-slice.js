import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    initialState: '',
    name: "usersSlice",
    reducers: {
        storeUser: (state, action) => {
            return action.payload;
        }
    },
})

export const { storeUser } = usersSlice.actions;

export default usersSlice.reducer;