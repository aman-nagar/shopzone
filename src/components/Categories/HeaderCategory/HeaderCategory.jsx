// src/components/Categories/HeaderCategory/HeaderCategory.jsx

import React, { useEffect, useRef } from "react";
import "./HeaderCategory.scss";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HeaderCategory = ({ categories, showCategory }) => {
  const { contextSafe } = useGSAP();
  const ref = useRef(null);

  useEffect(() => {
    if (showCategory) {
      gsap.to(ref.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "bounce.out",
      });
    } else {
      gsap.to(ref.current, {
        x: -200,
        opacity: 0,
        duration: 0.3,
        ease: "",
      });
    }
  }, [showCategory]);

  return (
    <ul className={`header-category ${showCategory ? "show" : ""}`} ref={ref}>
      {categories.map((category) => (
        <li key={category.slug} className="category-list">
          <Link to={`/category/${category.slug}`}>{category.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default HeaderCategory;
