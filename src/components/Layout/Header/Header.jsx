//src/components/Header/Header.jsx
import "./Header.scss";
import { useContext, useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../Context/AppContext";
import Cart from "../../Cart/Cart";

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useContext(AppContext);
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li onClick={() => navigate("/")}>Home</li>
            <li>
              <Link to="/category">Category</Link>
            </li>
          </ul>
          <Link className="center" to="/">
            Shop Zone
          </Link>
          <div className="right">
            <TbSearch onClick={() => setShowSearch(true)} />
            <AiOutlineHeart />
            <span className="cart-icon" onClick={() => setShowCart(!showCart)}>
              <CgShoppingCart />
              {!!cartQuantity  && <span>{cartQuantity}</span>}
            </span>
          </div>
        </div>
      </header>
      {showCart && <Cart setShowCart={setShowCart} />}
    </>
  );
};

export default Header;
