// src/components/Filters/Filter.jsx
import React from "react";
import "./Filter.scss";
import { CiFilter } from "react-icons/ci";
import { filterOptions } from "./filterConfig";
// import { filterOptions } from "./filterConfig";

export default function Filter({
  filteredCategory,
  setFilteredCategory,
  sortOption,
  setSortOption,
}) {
  const handleCategoryChange = (e) => {
    setFilteredCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="filter">
      <CiFilter className="filter-icon" />
      <div className="filter-options">
        <select
          name="category"
          id="category"
          value={filteredCategory}
          onChange={handleCategoryChange}
        >
          {filterOptions.category.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          name="sort"
          id="sort"
          value={sortOption}
          onChange={handleSortChange}
        >
          {filterOptions.sort.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
