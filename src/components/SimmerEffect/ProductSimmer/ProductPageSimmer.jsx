// ProductPageSimmer.jsx
import React from "react";
import "./ProductPageSimmer.scss";

export default function ProductPageSimmer() {
  return (
    <div className="product-loader">
      <div className="product shimmer-card">
        <div className="images shimmer-element"></div>
        <div className="details">
          <h2 className="shimmer-element"></h2>
          <p className="shimmer-element"></p>
        </div>
      </div>
    </div>
  );
}
