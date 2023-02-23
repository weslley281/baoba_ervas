import React, { createContext, useContext, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextData = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
};

interface CartProviderProps {
  children?: React.ReactNode; // children definido como opcional
}

const CartContext = createContext<CartContextData>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
});

export const CartProvider: React.FC = ({ children }: any) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      const updatedItems = cartItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    const updatedItems = cartItems.filter(
      (item) => item.product.id !== productId
    );
    setCartItems(updatedItems);
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    const updatedItems = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
