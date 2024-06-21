//src\store\product-slice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { saveState } from "./localStorage";
const PRODUCT_API_URL = "https://dummyjson.com/products";
const CATEGORY_API_URL = "https://dummyjson.com/products/categories";

// const PRODUCT_API_URL = "https://api.escuelajs.co/api/v1/products";
// const PRODUCT_API_URL = "https://api.escuelajs.co/api/v1/products";

// fetching products and categories
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(PRODUCT_API_URL);
    const data = await response.json();
    saveState({ products: data.products }); // Save fetched products to local storage
    console.log(data.products);

    return data.products; //this is for url
    // return data;
  }
);

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetch(CATEGORY_API_URL);
    const data = await response.json();
    saveState({ categories: data }); // Save fetched categories to local storage
    return data;
  }
);

// Slice for products
const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: JSON.parse(localStorage.getItem("products")) || [],
    categories: JSON.parse(localStorage.getItem("categories")) || [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice;
