// src/components/Cards/ProductCard.jsx
import "./ProductCard.scss";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart-slice";
import { LuPlus } from "react-icons/lu";

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
            <LuPlus />
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
