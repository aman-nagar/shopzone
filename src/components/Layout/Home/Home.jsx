// src/components/Layout/Home/Home.jsx
import "./Home.scss";
import React, { useEffect } from "react";
import Banner from "./Banner/Banner";
import ProductCard from "../../Cards/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts } from "../../../store/product-slice";

export default function Home() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.allProducts);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  return (
    <>
      <Banner />
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
                thumbnail={product.images ? product.images[0] : ""}
                title={product.title}
                price={product.price}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}
