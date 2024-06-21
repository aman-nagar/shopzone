//src\components\Layout\Header\Header.jsx
import "./Header.scss";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import gsap from "gsap";
import Cart from "../../Cart/Cart";
import HeaderCategory from "../../Categories/HeaderCategory/HeaderCategory";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../../store/ui-slice";
import { fetchCategories } from "../../../store/product-slice";
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from "react-icons/io";
import Search from "./Search/Search";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const categories = useSelector((state) => state.products.categories);
  const status = useSelector((state) => state.products.status);

  const throttle = (func, delay) => {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return func(...args);
    };
  };

  const handleScroll = useCallback(
    throttle(() => {
      const offset = window.scrollY;
      setScrolled(offset > 200);
    }, 300),
    []
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleToggleCart = useCallback(() => {
    dispatch(toggle());
  }, [dispatch]);

  const handleShowCategory = useCallback(() => {
    setShowCategory((prev) => !prev);
  }, []);

  // animate with gsap
  const headerRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
      }
    );
  }, []);

  return (
    <>
      {cartIsVisible && (
        <div className="overlay" onClick={handleToggleCart}></div>
      )}
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content" ref={headerRef}>
          <ul className="left">
            <li onClick={() => navigate("/")}>Home</li>
            <li className="category-nav" onClick={handleShowCategory}>
              <p>Category </p>
              <span>
                {showCategory ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
              {showCategory && (
                <HeaderCategory
                  categories={categories}
                  showCategory={showCategory}
                />
              )}
            </li>
          </ul>
          <Link className="center" to="/">
            Shop Zone
          </Link>
          <div className="right">
            <Search />
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
