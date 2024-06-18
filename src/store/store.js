//src\store\store.js
import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "../store/ui-slice";
import productSlice, { fetchCategories, fetchProducts } from "./product-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    products: productSlice.reducer,
    ui: uiSlice.reducer,
  },
});

store.dispatch(fetchProducts());
store.dispatch(fetchCategories());
export default store;
