import React, { useReducer, createContext, useEffect } from "react";

export const GlobalContext = createContext();

const getLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState = {
  cart: getLocalStorage(),
  totalPrice: 0,
  totalAmount: 0,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TO_CART":
      const updatedCart = [...state.cart, { ...payload, amount: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };

    case "INCREMENT":
      const incrementedCart = state.cart.map((item) =>
        item.id === payload ? { ...item, amount: item.amount + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(incrementedCart));
      return { ...state, cart: incrementedCart };

    case "DECREMENT":
      const decrementedCart = state.cart
        .map((item) =>
          item.id === payload ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount > 0);
      localStorage.setItem("cart", JSON.stringify(decrementedCart));
      return { ...state, cart: decrementedCart };

    case "DELETE":
      const filteredCart = state.cart.filter((item) => item.id !== payload);
      localStorage.setItem("cart", JSON.stringify(filteredCart));
      return { ...state, cart: filteredCart };

    case "CALCULATE_TOTAL":
      const { totalAmount, totalPrice } = state.cart.reduce(
        (acc, item) => {
          acc.totalAmount += item.amount;
          acc.totalPrice += item.amount * item.price;
          return acc;
        },
        { totalAmount: 0, totalPrice: 0 }
      );
      return {
        ...state,
        totalAmount,
        totalPrice,
      };

    default:
      return state;
  }
};

export const GlobalContentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
