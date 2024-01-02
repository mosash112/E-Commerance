import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchtoken = createAsyncThunk("usersSlice/fetchtoken", async () => {
//     const res = await fetch('http://localhost:9000/users/login', {
//         method: 'POST',
//         body: JSON.stringify({
//             email: "test@test.com",
//             password: "tester"
//         }),
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     });
//     const data = await res.json();
//     return data;
// })

const usersSlice = createSlice({
    initialState: '',
    name: "usersSlice",
    reducers: {
        storeUser: (state, action) => {
            return action.payload;
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchtoken.fulfilled, (state, action) => {
    //         const token = action.payload.token;
    //         return token;
    //     })
    // }
})

export const { storeUser } = usersSlice.actions;

export default usersSlice.reducer;