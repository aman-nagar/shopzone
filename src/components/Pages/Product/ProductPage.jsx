//src\components\Pages\Product\ProductPage.jsx
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../Context/AppContext";
import ProductSlider from "../../Slider/ProductSlider";
import "./ProductPage.scss";
import ProductPageSimmer from "../../SimmerEffect/ProductSimmer/ProductPageSimmer";

export default function ProductPage() {
  const { id } = useParams();
  const { allProducts } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (!allProducts.length) {
    return <ProductPageSimmer />;
  }

  const product = allProducts.find((product) => product.id == id);
  console.log(product);
  if (!product) {
    return <div>Product not Found</div>;
  }

  return (
    <div className="product-page">
      <div className="p-images">
        <img src={product.images[0]} alt="" />
      </div>
      <div className="p-info">
        <div className="p-details">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
        </div>
        <div className="price">
          <p>Price ${product.price}</p>
          <button className="add-to-cart">Add To Cart</button>
        </div>
      </div>
    </div>
  );
}
