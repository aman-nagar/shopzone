//src\components\Pages\Product\ProductPage.jsx

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.scss";
import ProductPageSimmer from "../../SimmerEffect/ProductSimmer/ProductPageSimmer";
import { Toaster, toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../../store/cart-slice";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.allProducts);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!allProducts.length) {
    return <ProductPageSimmer />;
  }

  const product = allProducts.find((product) => product.id === parseInt(id));
  if (!product) {
    return <div>Product not Found</div>;
  }

  const handleAddToCart = (productId, title, price, thumbnail) => {
    dispatch(
      addItemToCart({
        id: productId,
        title,
        price,
        thumbnail,
      })
    );
    toast.success("Product added to cart");
  };

  return (
    <>
      <div className="product-page">
        <div className="p-images">
          <img src={product.images[0]} alt={product.title} />
        </div>
        <div className="p-info">
          <div className="p-details">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
          </div>
          <div className="price">
            <p>Price ${product.price}</p>
            <button
              className="add-to-cart"
              onClick={() =>
                handleAddToCart(
                  product.id,
                  product.title,
                  product.price,
                  product.thumbnail
                )
              }
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
