import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

const getId = (item) => (item && (item.id ?? item.name));

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // persist cart
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  const findIndexById = (items, id) =>
    items.findIndex((it) => (it.id ?? it.name) === id);

  // add to cart (used by product pages)
  const addToCart = (product) => {
    const id = getId(product);
    setCartItems((prev) => {
      const idx = findIndexById(prev, id);
      if (idx !== -1) {
        // increase quantity by 1
        const copy = prev.map((it, i) =>
          i === idx ? { ...it, quantity: (it.quantity || 1) + 1 } : it
        );
        return copy;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // increase by exactly 1 (used by Cart + button)
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((it) =>
        (it.id ?? it.name) === id ? { ...it, quantity: (it.quantity || 1) + 1 } : it
      )
    );
  };

  // decrease by exactly 1; remove item if quantity becomes 0
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.flatMap((it) => {
        if ((it.id ?? it.name) !== id) return [it];
        const q = it.quantity || 1;
        if (q > 1) return [{ ...it, quantity: q - 1 }];
        return []; // remove if q === 1
      })
    );
  };

  // remove completely
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((it) => (it.id ?? it.name) !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
