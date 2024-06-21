import React, { useRef, useState } from "react";
import "./Search.scss"; // Assuming you have a Sass file for styling
import { IoSearch } from "react-icons/io5"; // Assuming you have installed react-icons package

const Search = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [inputWidth, setInputWidth] = useState(0);
  const inputRef = useRef(null);

  const handleOpenSearch = () => {
    setIsOpenSearch((prev) => !prev);
    if (!isOpenSearch) {
      setInputWidth(180); // Set input width to expand
      inputRef.current.focus();
    } else {
      setInputWidth(0); // Reset input width to collapse
    }
  };

  return (
    <div className={`search-container ${isOpenSearch ? "active" : ""}`}>
      <input
        type="text"
        className="input"
        placeholder="Search... desabled now"
        style={{ width: inputWidth }}
        ref={inputRef}
      />
      <button className="search-btn" onClick={handleOpenSearch}>
        <IoSearch />
      </button>
    </div>
  );
};

export default Search;
