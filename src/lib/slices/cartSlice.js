import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (!action.payload || !action.payload.id) return;
      const item = state.cartProducts.find(
        (product) => product.id === action.payload.id,
      );
      if (item) {
        item.quantity += 1;
      } else {
        state.cartProducts.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartProducts.find(
        (product) => product.id === action.payload.id,
      );
      if (!item) return;
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    deleteFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload.id,
      );
    },
  },
});

export const { addToCart, deleteFromCart, decreaseQuantity } =
  cartSlice.actions;

export const selectTotalQuantity = (state) =>
  state.cart.cartProducts.reduce((sum, item) => sum + item.quantity, 0);

export const selectTotalPrice = (state) =>
  state.cart.cartProducts
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

export default cartSlice.reducer;
