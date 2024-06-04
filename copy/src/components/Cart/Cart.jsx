//src\components\Cart\Cart.jsx
import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import "./Cart.scss";
import { IoMdClose } from "react-icons/io";

function Cart({ setShowCart }) {
  const { cart, removeFromCart, clearCart } = useContext(AppContext);

  return (
    <div className="cart">
      <IoMdClose id="close-cart" onClick={() => setShowCart(false)} />
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your Cart is Empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <img src={item.thumbnail} alt="" />
                <div>
                  <h3>{item.title} </h3>
                  <p>{item.price} </p>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={clearCart} className="clear-cart">
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
