//src\store\store.js
import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "../store/ui-slice";
import productSlice, { fetchProducts } from "./product-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    products: productSlice.reducer,
    ui: uiSlice.reducer,
  },
});

store.dispatch(fetchProducts());
export default store;
