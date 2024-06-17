// src/components/Layout/Home/Home.jsx
import "./Home.scss";
import React, { useContext, useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import { AppContext } from "../../../Context/AppContext";
import ProductCard from "../../Cards/ProductCard";
import HomeCategory from "../../Categories/HomeCategory/HomeCategory";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/product-slice";

export default function Home() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.allProducts);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div>
      <Banner />

      {/* <HomeCategory allProducts={allProducts} categoryList={categoryList} /> */}
      <section className="main">
        <div className="product-list">
          {status === "loading" ? (
            <p>Loading...</p>
          ) : status === "failed" ? (
            <p>Error loading products.</p>
          ) : (
            allProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                thumbnail={product.thumbnail}
                title={product.title}
                price={product.price}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
