// src/Context/AppContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const allProducts_URL = "https://dummyjson.com/products";
      const categoryList_URL = "https://dummyjson.com/products/categories";

      try {
        const [allProductsResponse, categoryListResponse] = await Promise.all([
          fetch(allProducts_URL),
          fetch(categoryList_URL),
        ]);

        if (!allProductsResponse.ok || !categoryListResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const allProductsData = await allProductsResponse.json();
        const categoryListData = await categoryListResponse.json();

        setAllProducts(allProductsData.products);
        setCategoryList(categoryListData);
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      }
    }

    fetchData();
  }, []);

  //cart managment
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log(cart);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        allProducts,
        categoryList,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
