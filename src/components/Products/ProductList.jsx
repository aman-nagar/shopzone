//src\components\Products\ProductList.jsx
import React from "react";
import ProductCard from "../Cards/ProductCard";
import productSlice from "../../store/product-slice";
import "./ProductList.scss";
export default function ProductList({ products }) {
  return (
    <div className="product-list" id="products">
      {productSlice.length === 0 ? (
        <p>No Products Found</p>
      ) : (
        products.map((product) => (
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
  );
}
