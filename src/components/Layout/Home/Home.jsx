// src/components/Layout/Home/Home.jsx
import "./Home.scss";
import React, { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import ProductCard from "../../Cards/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts } from "../../../store/product-slice";
import { selectFilteredProducts } from "../../../store/product-selectors";
import Filter from "../../Filters/Filter";
import ProductList from "../../Products/ProductList";

export default function Home() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.allProducts);
  const status = useSelector((state) => state.products.status);
  const [filteredCategory, setFilteredCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const filteredProducts = useSelector((state) =>
    selectFilteredProducts(
      state.products.allProducts,
      filteredCategory,
      sortOption
    )
  );

  return (
    <>
      <Banner />
      <section className="main">
        <Filter
          filteredCategory={filteredCategory}
          setFilteredCategory={setFilteredCategory}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        {status === "loading" ? (
          <p>Loading...</p>
        ) : status === "failed" ? (
          <p>Error loading products.</p>
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </section>
    </>
  );
}
