import React, { useReducer } from "react";

export default function CategoryPage() {
  const initialState = 0;
  const reducer = (state, action) => {
    switch (action.type) {
      case "increment":
        return state + 1;
      case "decrement":
        return state - 1;
      default:
        return state;
    }
  };

  const [counter, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>counter {counter}</h2>
      <button onClick={() => dispatch({ type: "increment" })}>increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>decrement</button>
    </div>
  );
}
