import React, { useContext } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button } from '../../components/Button';

import {
  Container,
  ContainerCart,
  ContainerImage,
  ContainerProduct,
  ContainerText,
  Header,
  ImageCart,
  TextCart,
  Title,
} from './styles';
import { CartContext } from '../../contexts/CartContext';

import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { ContainerUser } from '../../components/ContainerUser';

export function Cart() {
  const { signOut, user } = useAuth();
  const { productsCart } = useContext(CartContext);

  async function BringDataOfProductByID<ProductsProps>(product_id: number) {
    try {
      const searshProduct = await api.get(`products/product/${product_id}`);
      return searshProduct.data;
    } catch (error) {
      console.log('Não foi possivel buscar dados dos produtos');
      return '';
    }
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <ContainerUser
            name={user.name}
            photo={user.photo!}
            signOut={signOut}
          />
          <Header>
            <Title>Meus Produtos</Title>
          </Header>

          <ContainerCart>
            {productsCart.map((product) => {
              return (
                <ContainerProduct key={product.id}>
                  <ContainerImage>
                    <ImageCart source={{ uri: product.photo }} />
                  </ContainerImage>

                  <ContainerText>
                    <TextCart firstChild={true}>{product.name}</TextCart>
                    <TextCart firstChild={false}>{product.value}</TextCart>
                  </ContainerText>
                </ContainerProduct>
              );
            })}

            <Button title="Alterar" light="true" onPress={() => {}} />
          </ContainerCart>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
