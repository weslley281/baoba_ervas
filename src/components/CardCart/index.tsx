import { useContext } from 'react';
import { Container, ContainerCart, Quantidade } from './styles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { CartContext } from '../../contexts/CartContext';

export function CardCart() {
  const { productsCart, addProductToCart, removeProductToCart, clearCart } =
    useContext(CartContext);

  const totalItems = productsCart.reduce(
    (accumulator, product) => accumulator + product.qtd,
    0
  );

  const totalItemsValue = productsCart.reduce(
    (accumulator, product) => accumulator + product.value,
    0
  );

  const totalItemsValueFormatted =
    'R$ ' + totalItemsValue.toFixed(2).replace('.', ',');

  return (
    <Container>
      <ContainerCart>
        <FeatherIcon name="shopping-cart" size={24} color="white" />
        <Quantidade>{totalItems}</Quantidade>
        <Quantidade>= {totalItemsValueFormatted}</Quantidade>
      </ContainerCart>
    </Container>
  );
}
