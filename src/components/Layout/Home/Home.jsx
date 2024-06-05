// src/components/Layout/Home/Home.jsx
import "./Home.scss";
import React, { useContext, useState } from "react";
import Banner from "./Banner/Banner";
import { AppContext } from "../../../Context/AppContext";
import ProductCard from "../../Cards/ProductCard";
import HomeCategory from "../../HomeCategory/HomeCategory";

export default function Home() {
  const { allProducts, categoryList } = useContext(AppContext);

  return (
    <div>
      <Banner />

      {/* <HomeCategory allProducts={allProducts} categoryList={categoryList} /> */}
      <section className="main">
        <div className="product-list">
          {allProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              thumbnail={product.thumbnail}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
