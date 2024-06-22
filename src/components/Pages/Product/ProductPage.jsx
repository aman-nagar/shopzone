//src\components\Pages\Product\ProductPage.jsx
import "./ProductPage.scss";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductPageSimmer from "../../SimmerEffect/ProductSimmer/ProductPageSimmer";
import { Toaster, toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../../store/cart-slice";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

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

  // rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-full-${i}`} />);
    }

    if (halfStars === 1) {
      stars.push(<FaStarHalfAlt key={`star-half-${fullStars}`} />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`star-empty-${i}`} />);
    }

    return <div className="rating-stars">{stars}</div>;
  };

  return (
    <>
      <div className="product-page">
        <div className="p-images">
          <img src={product.images[0]} alt={product.title} />
        </div>
        <div className="p-info p-mobile">
          <div className="p-details">
            <h2>{product.title}</h2>
            <p className="brand">
              <span className="brand-heading">Brand:</span> {product.brand}
            </p>

            <p className="product-desc ">
              <span className="desc-heading">Description:</span>
              <span className="desc-truncate">{product.description}</span>
            </p>
          </div>
          <div className="price-rating">
            <p className="price">
              <span className="price-tag">Price </span>${product.price}
            </p>
            <div className="rating-container">
              {renderStars(product.rating)}
            </div>
          </div>

          <button
            className="add-to-cart buy-now"
            onClick={() =>
              handleAddToCart(
                product.id,
                product.title,
                product.price,
                product.thumbnail
              )
            }
          >
            Buy Now
          </button>
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
      <Toaster />
    </>
  );
}
