//src\components\Cart\Cart.jsx

import React, { useContext } from "react";
import "./Cart.scss";
import { IoMdClose } from "react-icons/io";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AppContext } from "../../Context/AppContext";
export default function Cart({ showCart, setShowCart }) {
  const { contextSafe } = useGSAP();
  const { cart } = useContext(AppContext);
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
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <img src={item.thumbnail} alt={item.thumbnail} />
            <div className="cart-details">
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
