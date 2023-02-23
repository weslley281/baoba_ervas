import { createContext, useState, ReactNode } from 'react';

type Product = { id: number; qtd: number };

type CartContextType = {
  productsCart: Product[];
  addProductToCart: (id: number) => void;
  removeProductToCart: (id: number) => void;
  clearCart: () => void;
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext({} as CartContextType);

export default function CartProvider({ children }: CartProviderProps) {
  const [productsCart, setProductsCart] = useState<Product[]>([]);

  function addProductToCart(id: number) {
    const copyProductsCart = [...productsCart];

    const item = copyProductsCart.find((product) => product.id === id);

    if (!item) {
      copyProductsCart.push({ id: id, qtd: 1 });
    } else {
      item.qtd = item.qtd + 1;
    }

    setProductsCart(copyProductsCart);
  }

  function removeProductToCart(id: number) {
    const copyProductsCart = [...productsCart];

    const item = copyProductsCart.find((product) => product.id === id);

    if (item && item.qtd > 1) {
      item.qtd = item.qtd - 1;
      setProductsCart(copyProductsCart);
    } else {
      const arrayFiltered = copyProductsCart.filter(
        (product) => product.id !== id
      );
      setProductsCart(arrayFiltered);
    }
  }

  function clearCart() {
    setProductsCart([]);
  }

  return (
    <CartContext.Provider
      value={{ productsCart, addProductToCart, removeProductToCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
