import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Button } from '../../components/Button';
import { ProductsProps } from '../../DTO/ProductsDTO';
import { Linking, ScrollView } from 'react-native';
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
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';

interface Params {
  product: ProductsProps;
  goBack: () => void;
}

export function ProductDetail() {
  const { params } = useRoute();
  const { product } = params as Params;
  const price = product.price.toString().replace('.', ',');
  // const details = `Detalhes:\nPeso = ${product.weight}g\n, Comprimemento = ${product.length}cm\n, Largura = ${product.width}cm\n, Altura = ${product.height}cm`;

  const cartContext = useContext(CartContext);

  function redirectToWhatsapp() {
    Linking.openURL(
      `https://api.whatsapp.com/send?phone=556533621007&text=Olá%20tenho%20interesse%20em%20comprar%20o%20produto:%20${product.name}`
    );
  }

  function handleAddToCart(id: number) {
    cartContext.addProductToCart(id);
  }

  function handleRemoveToCart(id: number) {
    cartContext.removeProductToCart(id);
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
              handleAddToCart(product.product_id);
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
