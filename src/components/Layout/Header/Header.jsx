//src\components\Layout\Header\Header.jsx

// src/components/Layout/Header/Header.jsx
import "./Header.scss";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Cart from "../../Cart/Cart";
import HeaderCategory from "../../Categories/HeaderCategory/HeaderCategory";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../../store/ui-slice";
import { fetchCategories } from "../../../store/product-slice";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const categories = useSelector((state) => state.products.categories);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

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

  const handleShowCategory = () => {
    setShowCategory(!showCategory);
  };

  return (
    <>
      {cartIsVisible && (
        <div
          className="overlay"
          onClick={() => {
            dispatch(toggle());
          }}
        ></div>
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
                  setShowCategory={setShowCategory}
                />
              )}
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

            {/* <FaRegUserCircle /> */}
          </div>
        </div>
      </header>

      {cartIsVisible && <Cart />}
    </>
  );
};

export default Header;
