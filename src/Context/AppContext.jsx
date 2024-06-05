// src/Context/AppContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { toast } from "sonner";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
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

  // cart logic
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const handleAddToCart = (id, title, price, thumbnail) => {
    const updatedCart = [...cart];

    const existingProductIndex = updatedCart.findIndex((item) => item.id == id);
    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity++;
    } else {
      updatedCart.push({ id, title, price, thumbnail, quantity: 1 });
    }
    setCart(updatedCart);

    // add cartitem to localstorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Product added to cart");

    // setCart((prevCart) => {
    //   const existingProduct = prevCart.find((item) => item.id == id);
    //   if (existingProduct) {
    //     return prevCart.map((item) =>
    //       item.id == id ? { ...item, quantity: item.quantity + 1 } : item
    //     );
    //   } else {
    //     return [...prevCart, { id, title, price, thumbnail, quantity: 1 }];
    //   }
    // });
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getProductQuantity = (id) => {
    const product = cart.find((item) => item.id == id);
    return product ? product.quantity : 0;
  };
  return (
    <AppContext.Provider
      value={{
        allProducts,
        categoryList,
        cart,
        setCart,
        handleAddToCart,
        getTotalQuantity,
        getProductQuantity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
