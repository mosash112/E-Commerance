import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/products-slice";
import cartSlice from "./slices/cart-slice";
import usersSlice from "./slices/auth-slice";
import collapseSlice from "./slices/collapse-slice";
import productsFilterSlice from "./slices/filter-slice";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
}

const reducer = combineReducers({
    products: productsSlice,
    cart: cartSlice,
    user: usersSlice,
    collapse: collapseSlice,
    filter: productsFilterSlice
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store);