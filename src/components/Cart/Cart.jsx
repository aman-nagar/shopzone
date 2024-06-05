//src\components\Cart\Cart.jsx
import React, { useContext } from "react";
import "./Cart.scss";
import emptyCart from "../../assets/cart/emptyCart.png";
import { IoMdClose } from "react-icons/io";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AppContext } from "../../Context/AppContext";
import { MdDeleteForever } from "react-icons/md";

export default function Cart({ showCart, setShowCart }) {
  const { contextSafe } = useGSAP();
  const {
    cart,
    removeCartItem,
    incrementCartQuantity,
    decrementCartQuantity,
    getTotalCartPrice,
  } = useContext(AppContext);
  console.log(cart);

  //animate cart
  contextSafe(
    useGSAP(() => {
      if (showCart) {
        gsap.from(".cart", {
          x: 200,
          duration: 0.5,
          ease: "bounce.out",
        });
      }
    }, [showCart])
  );

  return (
    <div className="cart">
      <IoMdClose id="close-cart" onClick={() => setShowCart(false)} />
      <ul className="cart-container">
        {cart.map((item) => (
          <li key={item.id} className="product-container">
            <img src={item.thumbnail} alt={item.thumbnail} />
            <div className="cart-details">
              <h3 className="title">
                {item.title}
                <MdDeleteForever
                  className="clear-item"
                  onClick={() => removeCartItem(item.id)}
                />
              </h3>
              <div className="product-info">
                <p className="price">Price: ${item.price}</p>
                <div className="cart-actions">
                  <button onClick={() => decrementCartQuantity(item.id)}>
                    -
                  </button>
                  <p className="quantity"> {item.quantity}</p>
                  <button onClick={() => incrementCartQuantity(item.id)}>
                    +
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {cart.length ? (
        <div className="cart-total">
          <div className="total-price">
            <p>Total Price</p>${getTotalCartPrice().toFixed(2)}
          </div>
          <button>Checkout</button>
        </div>
      ) : (
        <div className="cart-empty">
          <img className="empty-cart-img" src={emptyCart} alt={emptyCart} />
        </div>
      )}
    </div>
  );
}
