import { createContext, useState, ReactNode } from 'react';

type Product = {
  id: number;
  qtd: number;
  value: number;
  valueFixed: number;
  name: string;
  photo: string;
};

type CartContextType = {
  productsCart: Product[];
  addProductToCart: (
    id: number,
    value: number,
    valueFixed: number,
    name: string,
    photo: string
  ) => void;
  removeProductToCart: (id: number, value: number) => void;
  clearCart: () => void;
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext({} as CartContextType);

export default function CartProvider({ children }: CartProviderProps) {
  const [productsCart, setProductsCart] = useState<Product[]>([]);

  function addProductToCart(
    id: number,
    value: number,
    valueFixed: number,
    name: string,
    photo: string
  ) {
    const copyProductsCart = [...productsCart];

    const item = copyProductsCart.find((product) => product.id === id);

    if (!item) {
      copyProductsCart.push({ id: id, qtd: 1, value, name, photo, valueFixed });
    } else {
      item.qtd += 1;
      item.value += value;
    }

    setProductsCart(copyProductsCart);
  }

  function removeProductToCart(id: number, value: number) {
    const copyProductsCart = [...productsCart];

    const item = copyProductsCart.find((product) => product.id === id);

    if (item && item.qtd > 1) {
      item.qtd = item.qtd - 1;
      item.value -= value;
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
