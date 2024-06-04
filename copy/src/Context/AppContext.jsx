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
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        // Product already in cart, increase its quantity
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        // Product not in cart, add it with a quantity of 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
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
