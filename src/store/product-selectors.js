// src/store/product-selectors.js
export const selectFilteredProducts = (products, category, sortOption) => {
  let filteredProducts = category === "all" ? products : products.filter((product) => product.category === category);

  // Create a copy of the array before sorting to maintain immutability
  let sortedProducts = [...filteredProducts];

  switch (sortOption) {
    case "price-asc":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  return sortedProducts;
};
