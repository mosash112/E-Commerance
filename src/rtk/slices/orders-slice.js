import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ORDERS_ENDPOINT } from '../../env';
import { useSelector } from "react-redux";

export const fetchAllOrders = createAsyncThunk("ordersSlice/fetchAllOrders", async () => {
    const token = useSelector(state => state.user.token)
    const headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
    const res = await fetch(ORDERS_ENDPOINT, headers);
    const data = await res.json();
    console.log("admin data: ", data);
    return data;
})

export const fetchUserOrders = createAsyncThunk("ordersSlice/fetchUserOrders", async (userId) => {
    const token = useSelector(state => state.user.token)
    const headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
    const res = await fetch(ORDERS_ENDPOINT + '/users/' + userId, headers);
    const data = await res.json();
    console.log("data: ", data);
    return data;
})

const ordersSlice = createSlice({
    initialState:[],
    name: "ordersSlice",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
            const orders = action.payload.orders;
            console.log(orders);
            return orders;
        });
        builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
            const orders = action.payload.orders;
            console.log(orders);
            return orders;
        });
    }
})

// export const { } = ordersSlice.actions;

export default ordersSlice.reducer;