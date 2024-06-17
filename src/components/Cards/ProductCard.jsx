// src/components/Cards/ProductCard.jsx
import React, { useContext } from "react";
import "./ProductCard.scss";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart-slice";

export default function ProductCard({ thumbnail, title, price, id }) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        id,
        title,
        price,
        thumbnail,
      })
    );
    toast.success("Product added to cart");
  };
  // const { handleAddToCart } = useContext(AppContext);

  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="p-image">
        <div>
          <img src={thumbnail} alt="thumbnail" />
        </div>
      </Link>
      <div className="p-details">
        <h3>{title}</h3>
        <div className="price">
          <p>${price}</p>
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
