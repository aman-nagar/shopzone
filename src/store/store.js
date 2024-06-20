//src\store\store.js
import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "../store/ui-slice";
import productSlice, { fetchCategories, fetchProducts } from "./product-slice";
import cartSlice from "./cart-slice";
import { loadState, saveState } from "./localStorage";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    products: productSlice.reducer,
    ui: uiSlice.reducer,
  },
  preloadedState: preloadedState,
});

store.subscribe(() => {
  saveState({
    cart: store.getState().cart, // Save only the necessary parts of the state
    products: store.getState().products,
  });
});

// store.dispatch(fetchProducts());
// store.dispatch(fetchCategories());

export default store;
