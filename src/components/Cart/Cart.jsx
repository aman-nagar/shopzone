//src\components\Cart\Cart.jsx
// src/components/Cart/Cart.jsx

import React from "react";
import "./Cart.scss";
import emptyCart from "../../assets/cart/emptyCart.png";
import { IoMdClose } from "react-icons/io";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeItemFromCart,
} from "../../store/cart-slice";
import { toggle } from "../../store/ui-slice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const totalCartPrice = useSelector((state) => state.cart.totalPrice);
  const { contextSafe } = useGSAP();

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  contextSafe(
    useGSAP(() => {
      gsap.from(".cart", {
        x: 200,
        duration: 0.5,
        ease: "bounce.out",
      });
    })
  );

  return (
    <div className="cart">
      <IoMdClose id="close-cart" onClick={() => dispatch(toggle())} />
      <button className="clear-cart" onClick={handleClearCart}>
        Clear Cart
      </button>
      <ul className="cart-container">
        {cart.map((item) => (
          <li key={item.id} className="product-container">
            <img src={item.thumbnail} alt={item.thumbnail} />
            <div className="cart-details">
              <h3 className="title">
                {item.title}
                <MdDeleteForever
                  className="clear-item"
                  onClick={() => handleRemoveItem(item.id)}
                />
              </h3>
              <div className="product-info">
                <p className="price">Price: ${item.price}</p>
                <div className="cart-actions">
                  <button onClick={() => handleDecrementQuantity(item.id)}>
                    -
                  </button>
                  <p className="quantity"> {item.quantity}</p>
                  <button onClick={() => handleIncrementQuantity(item.id)}>
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
            <p>Total Price</p>${totalCartPrice.toFixed(2)}
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
};

export default Cart;
