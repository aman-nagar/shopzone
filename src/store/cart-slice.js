import { createSlice } from "@reduxjs/toolkit";
import { saveState } from "./localStorage";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("cart")) || [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
          thumbnail: newItem.thumbnail,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalPrice += newItem.price;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const updatedItems = state.items.filter((item) => item.id !== id);
      const removedItem = state.items.find((item) => item.id === id);
      state.totalQuantity -= removedItem.quantity;
      state.totalPrice -= removedItem.totalPrice;
      state.items = updatedItems;
      saveState({ cart: state.items }); // Save updated cart state to local storage
    },
    incrementQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      existingItem.quantity++;
      existingItem.totalPrice += existingItem.price;
      state.totalQuantity++;
      state.totalPrice += existingItem.price;
      saveState({ cart: state.items }); // Save updated cart state to local storage
    },
    decrementQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      existingItem.quantity--;
      existingItem.totalPrice -= existingItem.price;
      state.totalQuantity--;
      state.totalPrice -= existingItem.price;
      if (existingItem.quantity === 0) {
        state.items = state.items.filter((item) => item.id !== id);
      }
      saveState({ cart: state.items }); // Save updated cart state to local storage
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveState({ cart: [] }); // Clear cart in local storage
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice;
