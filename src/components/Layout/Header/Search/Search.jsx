import React, { useRef, useState } from "react";
import "./Search.scss";
import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Search = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const allProducts = useSelector((state) => state.products.allProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const toggleSearchBar = () => {
    setIsOpenSearch((prev) => !prev);
    if (!isOpenSearch) {
      inputRef.current.focus();
    } else {
      setInput("");
      setFilteredProducts([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value) {
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  return (
    <div className={`search-container ${isOpenSearch ? "active" : ""}`}>
      <input
        type="text"
        className="input"
        placeholder="Search..."
        style={{ width: isOpenSearch ? 180 : 0 }}
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
      />
      <button className="search-btn" onClick={toggleSearchBar}>
        <IoSearch />
      </button>
      {isOpenSearch && filteredProducts.length > 0 && (
        <ul className="search-results">
          {filteredProducts.map((product) => (
            <li key={product.id} className="search-result-item">
              <Link to={`/product/${product.id}`} onClick={toggleSearchBar}>
                {product.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
