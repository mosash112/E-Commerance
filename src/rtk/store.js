import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/products-slice";
import cartSlice from "./slices/cart-slice";
import usersSlice from "./slices/auth-slice";
import collapseSlice from "./slices/collapse-slice";
import productsFilterSlice from "./slices/filter-slice";

export const store = configureStore({
    reducer: {
        products: productsSlice,
        cart: cartSlice,
        user: usersSlice,
        collapse: collapseSlice,
        filter: productsFilterSlice
    }
})