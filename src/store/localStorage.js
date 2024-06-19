// src/utils/localStorage.js
export const getLocalStorageItem = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorageItem = (key) => {
  localStorage.removeItem(key);
};
