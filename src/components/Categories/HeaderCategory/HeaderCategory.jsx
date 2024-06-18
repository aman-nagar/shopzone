// src/components/Categories/HeaderCategory/HeaderCategory.jsx
import React, { useEffect } from "react";
import "./HeaderCategory.scss"; // Import your CSS file for styling
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HeaderCategory = ({ categories, setShowCategory }) => {
  const { contextSafe } = useGSAP();

  contextSafe(() => {
    gsap.fromTo(
      ".header-category",
      { x: -400 },
      { x: 0, duration: 0.5, ease: "bounce.out" }
    );
  });

  return (
    <ul className="header-category">
      {categories.map((category) => (
        <li key={category.slug} className="category-list">
          <Link to={`/category/${category.slug}`}>{category.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default HeaderCategory;
