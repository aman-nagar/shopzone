//src\components\Cart\Cart.jsx
import React from "react";
import "./Cart.scss";
import { IoMdClose } from "react-icons/io";
export default function Cart({ setShowCart }) {
  return (
    <div className="cart">
      <IoMdClose id="close-cart" onClick={() => setShowCart(false)} />
    </div>
  );
}
