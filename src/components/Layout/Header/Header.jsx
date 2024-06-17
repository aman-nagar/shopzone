//src\components\Layout\Header\Header.jsx
import "./Header.scss";
import { useEffect, useRef, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../../Cart/Cart";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../../store/ui-slice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const [scrolled, setScrolled] = useState(false);

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
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggleCart = () => {
    dispatch(toggle());
  };

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
      {cartIsVisible && (
        <div
          className="overlay"
          onClick={() => {
            dispatch(toggle()); // Close cart when overlay is clicked
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
            <AiOutlineHeart />
            <span className="cart-icon" onClick={handleToggleCart}>
              <CgShoppingCart />
              <span>{cartTotalQuantity}</span>
            </span>
          </div>
        </div>
      </header>
      {cartIsVisible && <Cart />}
    </>
  );
};

export default Header;
