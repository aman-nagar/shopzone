// src/utils/localStorage.js

// Function to load state from local storage
export const loadState = (state) => {
  try {
    const serializedState = localStorage.getItem("reduxSate");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    //err
  }
};

// Function to save state to local storage
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxSate", serializedState);
  } catch (err) {
    //err
  }
};
