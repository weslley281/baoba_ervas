//libs
import React, { useContext } from 'react';
import { Linking, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
//imports
import { ProductsProps } from '../../DTO/ProductsDTO';
import {
  Container,
  ContainerDescriptions,
  ContainerPrice,
  Content,
  Descriptions,
  Header,
  HeaderContainer,
  ImageProduct,
  Line,
  Price,
  Title,
} from './styles';
import { CartContext } from '../../contexts/CartContext';
//components
import { Button } from '../../components/Button';

interface Params {
  product: ProductsProps;
  goBack: () => void;
}

export function ProductDetail() {
  const { params } = useRoute();
  const { product } = params as Params;
  const price = product.price.toString().replace('.', ',');

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

  function redirectToWhatsapp() {
    Linking.openURL(
      `https://api.whatsapp.com/send?phone=556533621007&text=Olá%20tenho%20interesse%20em%20comprar%20o%20produto:%20${product.name}`
    );
  }

  function handleAddToCart(id: number, value: number) {
    addProductToCart(id, value);
  }

  function handleRemoveToCart(id: number) {
    removeProductToCart(id);
  }

  return (
    <Container>
      <Header>
        <HeaderContainer>
          <Title>{product.name}</Title>
          <ImageProduct source={{ uri: product.image }} />
        </HeaderContainer>
      </Header>

      <Content>
        <ContainerPrice>
          <Price>R$ {price}</Price>
        </ContainerPrice>

        <Line />

        <ContainerDescriptions>
          <ScrollView>
            <Descriptions>
              Total de itens no carrinho: {totalItems}
              Valor do Total de itens no carrinho: {totalItemsValue}
            </Descriptions>
            <Descriptions>
              {product.descriptiom
                ? product.descriptiom
                : 'Haverá aqui um testo que descreverá esse produto, como o seu uso, igredientes e modo de preparo\n'}
            </Descriptions>
            {/* <Descriptions>{details}</Descriptions> */}
          </ScrollView>

          <Button
            title="Adcionar ao Carrinho"
            light
            onPress={() => {
              handleAddToCart(product.product_id, product.price);
            }}
          />
          <Button
            title="Remover do Carrinho"
            light
            onPress={() => {
              handleRemoveToCart(product.product_id);
            }}
          />
          <Button title="Tenho interesse" light onPress={redirectToWhatsapp} />
        </ContainerDescriptions>
      </Content>
    </Container>
  );
}
