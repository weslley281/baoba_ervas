//libs
import React, { useContext } from 'react';
import { Linking, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
//imports
import { ProductsProps } from '../../DTO/ProductsDTO';
import {
  Container,
  ContainerButtonAddOrRemove,
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
import { CardCart } from '../../components/CardCart';
import { ButtonOrAndRemove } from '../../components/ButtonOrAndRemove';

interface Params {
  product: ProductsProps;
  goBack: () => void;
}

export function ProductDetail() {
  const { params } = useRoute();
  const { product } = params as Params;
  const price = product.price.toString().replace('.', ',');

  const { addProductToCart, removeProductToCart } = useContext(CartContext);

  function redirectToWhatsapp() {
    Linking.openURL(
      `https://api.whatsapp.com/send?phone=556533621007&text=Olá%20tenho%20interesse%20em%20comprar%20o%20produto:%20${product.name}`
    );
  }

  function handleAddToCart(id: number, value: number) {
    addProductToCart(id, value);
  }

  function handleRemoveToCart(id: number, value: number) {
    removeProductToCart(id, value);
  }

  return (
    <Container>
      <CardCart />
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
              {product.description
                ? product.description
                : 'Haverá aqui um testo que descreverá esse produto, como o seu uso, igredientes e modo de preparo\n'}
            </Descriptions>
          </ScrollView>

          <ContainerButtonAddOrRemove>
            <ButtonOrAndRemove
              sizeButton={50}
              sizeIcon={30}
              type="add"
              onPress={() => {
                handleAddToCart(product.product_id, product.price);
              }}
            />
            <ButtonOrAndRemove
              sizeButton={50}
              sizeIcon={30}
              type="remove"
              onPress={() => {
                handleRemoveToCart(product.product_id, product.price);
              }}
            />
          </ContainerButtonAddOrRemove>
          <Button title="Tenho interesse" light onPress={redirectToWhatsapp} />
        </ContainerDescriptions>
      </Content>
    </Container>
  );
}
