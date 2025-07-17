import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add an item to the cart or increase quantity if it already exists
  const addToCart = (item) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  // Remove an item from the cart
  const removeFromCart = (itemId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== itemId));
  };

  // Update the quantity of an item
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Get the total price of items in the cart
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Get the total count of items in the cart
  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotal,
        clearCart,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook to use the Cart Context
export const useCart = () => useContext(CartContext);
