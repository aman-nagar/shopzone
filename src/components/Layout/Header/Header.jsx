//src\components\Layout\Header\Header.jsx
import "./Header.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../Context/AppContext";
import Cart from "../../Cart/Cart";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Header = () => {
  const navigate = useNavigate();
  // const { cart } = useContext(AppContext);
  const { getTotalQuantity } = useContext(AppContext);
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

  // animate with gsap
  const { contextSafe } = useGSAP();

  const headerRef = useRef(null);
  contextSafe(
    useGSAP(() => {
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.7,
      });
    })
  );

  return (
    <>
      {showCart && (
        <div
          className="overlay"
          onClick={() => {
            setShowCart(false);
            
          }}
        ></div>
      )}
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content" ref={headerRef}>
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
              <span>{getTotalQuantity()}</span>
            </span>
          </div>
        </div>
      </header>
      {showCart && <Cart showCart={showCart} setShowCart={setShowCart} />}
    </>
  );
};

export default Header;
