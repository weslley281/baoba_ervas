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

  return (
    <Container>
      <ContainerCart>
        <FeatherIcon name="shopping-cart" size={24} color="white" />
        <Quantidade>{totalItems}</Quantidade>
      </ContainerCart>
    </Container>
  );
}
