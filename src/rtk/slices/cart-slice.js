import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    initialState: [],
    name: "cartSlice",
    reducers: {
        addToCart: (state, action) => {
            const foundProduct = state.find((product) => product.id === action.payload.id)
            if (foundProduct) {
                foundProduct.quantity += 1
            } else {
                const productClone = { ...action.payload, quantity: 1 }
                state.push(productClone)
            }

        },
        deleteFromCart: (state, action) => {
            const productClone = { ...action.payload }
            if (productClone.quantity > 1) {
                const foundProduct = state.find((product) => product.id === action.payload.id)
                foundProduct.quantity -= 1
            } else {
                return state.filter((product) => product.id !== action.payload.id)
            }
        },
        clearCart: (state, action) => {
            return []
        }
    }
})

export const { addToCart, deleteFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;