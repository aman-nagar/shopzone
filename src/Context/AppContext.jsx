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

    toast.success("Product added to cart");
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getProductQuantity = (id) => {
    const product = cart.find((item) => item.id == id);
    return product ? product.quantity : 0;
  };

  const removeCartItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    toast.success("Product removed from cart");
  };

  const incrementCartQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id == id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decrementCartQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id == id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
    const item = cart.find((item) => item.id == id);
    if (item && item.quantity === 1) {
      toast.success("Product removed from cart");
    }
  };

  const getTotalCartPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
        removeCartItem,
        incrementCartQuantity,
        decrementCartQuantity,
        getTotalCartPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
