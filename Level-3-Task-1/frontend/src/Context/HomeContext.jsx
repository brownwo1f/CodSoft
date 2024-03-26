import React, { createContext, useState } from "react";
import all_product from "../assets/all_product";

export const HomeContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i <= all_product.length; i++) {
    cart[i] = 0;
  }
  return cart;
};

const HomeContextProvider = (props) => {
  const [cartItem, setCartItem] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };
  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmt = 0;
    let mrpAmt = 0;
    let discount = 0;
    for (let i in cartItem) {
      if (cartItem[i] > 0) {
        let item = all_product.find((product) => product.id === Number(i));
        mrpAmt += item.old_price * cartItem[i];
        totalAmt += item.new_price * cartItem[i];
        discount = mrpAmt - totalAmt;
      }
    }
    return { mrpAmt, totalAmt, discount };
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (let i in cartItem) {
      if (cartItem[i] > 0) {
        totalItems += cartItem[i];
      }
    }
    return totalItems;
  };

  const contextValue = {
    getTotalCartAmount,
    getTotalCartItems,
    all_product,
    cartItem,
    addToCart,
    removeFromCart,
  };

  return (
    <HomeContext.Provider value={contextValue}>
      {props.children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
