import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    initialState: [],
    name: "cartSlice",
    reducers: {
        addToCart: (state, action) => {
            const foundProduct = state.find((product) => product._id === action.payload._id)
            if (foundProduct) {
                foundProduct.quantity += 1
            } else {
                const productClone = { ...action.payload, quantity: 1 }
                // state.push(productClone)
                return [...state, productClone]
            }
        },
        deleteFromCart: (state, action) => {
            const currectCart = state
            return currectCart.filter((product) => product._id !== action.payload._id)
        },
        decreaseQuantity: (state, action) => {
            const productClone = { ...action.payload }
            if (productClone.quantity > 1) {
                const foundProduct = state.find((product) => product._id === action.payload._id)
                foundProduct.quantity -= 1
            }
        },
        clearCart: (state, action) => {
            return []
        }
    }
})

export const { addToCart, deleteFromCart, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;