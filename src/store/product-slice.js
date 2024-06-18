//src\store\product-slice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const PRODUCT_API_URL = "https://dummyjson.com/products";
const CATEGORY_API_URL = "https://dummyjson.com/products/categories";

// const PRODUCT_API_URL = "https://api.escuelajs.co/api/v1/products";
// const PRODUCT_API_URL = "https://api.escuelajs.co/api/v1/products";

export const fetchProducts = createAsyncThunk(
  "productss/fetchProducts",
  async () => {
    const response = await fetch(PRODUCT_API_URL);
    const data = await response.json();
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
    console.log(data);
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    categories: [],
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
