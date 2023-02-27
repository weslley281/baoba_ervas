import React, { useContext, useEffect, useState } from 'react';
// import PayPal from 'react-native-paypal-wrapper';
import { Provider as PaperProvider } from 'react-native-paper';
import { Button } from '../../components/Button';

import Stripe from 'stripe';
import { Token } from '@stripe/stripe-js';

import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';

import { Appbar } from 'react-native-paper';
import { Elements, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { NativeModules } from 'react-native';

import { Alert } from 'react-native';

import {
  Container,
  ContainerAddOrRemove,
  ContainerCart,
  ContainerImage,
  ContainerProduct,
  ContainerText,
  Footer,
  Header,
  ImageCart,
  TextCart,
  TextFooter,
  Title,
} from './styles';
import { CartContext } from '../../contexts/CartContext';
import { useAuth } from '../../hooks/auth';
import { ContainerUser } from '../../components/ContainerUser';
import { ButtonOrAndRemove } from '../../components/ButtonOrAndRemove';
import { api } from '../../services/api';

export function Cart() {
  const { signOut, user } = useAuth();
  const { productsCart, addProductToCart, removeProductToCart } =
    useContext(CartContext);

  const [cardNumber, setCardNumber] = useState(4242424242424242);
  const [expiryMonth, setExpiryMonth] = useState(12);
  const [expiryYear, setExpiryYear] = useState(23);
  const [installments, setInstallments] = useState(2);
  const [object, setObject] = useState('card');
  const [amount, setAmount] = useState(20000);
  const [description, setDescription] = useState('teste de implementação');
  const [cvc, setCvc] = useState(123);
  const [currency, setCurrency] = useState('brl');
  // const [source, setSource] = useState({
  //   object,
  //   number: cardNumber,
  //   exp_month: expiryMonth,
  //   exp_year: expiryYear,
  //   cvc,
  //   installments,
  // });

  const handlePayment = async () => {
    Alert.alert('Clicou', 'Clicando');
    console.log('------------------------CLicou------------------');
    const obj = {
      amount,
      currency,
      description,
      source: {
        object,
        number: cardNumber,
        exp_month: expiryMonth,
        exp_year: expiryYear,
        cvc,
        installments,
      },
    };

    console.log(obj);

    // await api
    //   .post('payments/stripe', obj)
    //   .then(() => {
    //     setTimeout(() => {
    //       Alert.alert('Alerta', 'Venda efetuada com sucesso');
    //     }, 1500);
    //   })
    //   .catch((error: any) => {
    //     Alert.alert('Erro', error);
    //     console.log(`Erro = ${error}`);
    //   });

    try {
      const response = await api.post('payments/stripe', obj);
      console.log(response.data);
      Alert.alert('Alerta', 'Venda efetuada com sucesso');
    } catch (error: any) {
      console.log(error);
      Alert.alert('Erro', error.message);
    }
  };

  const totalItems = productsCart.reduce(
    (accumulator, product) => accumulator + product.qtd,
    0
  );

  const totalItemsValue = productsCart.reduce(
    (accumulator, product) => accumulator + product.value,
    0
  );

  const totalItemsValueFormatted = totalItemsValue
    .toFixed(2)
    .toString()
    .replace('.', ',');

  function handleAddToCart(
    id: number,
    value: number,
    valueFixed: number,
    name: string,
    photo: string
  ) {
    addProductToCart(id, value, valueFixed, name, photo);
  }

  function handleRemoveToCart(id: number, value: number) {
    removeProductToCart(id, value);
  }

  return (
    <PaperProvider>
      <Container>
        <ContainerUser name={user.name} photo={user.photo!} signOut={signOut} />
        <Header>
          <Title>Meus Produtos</Title>
        </Header>

        <ContainerCart>
          {productsCart.map((product) => {
            const priceFormated = product.value
              .toFixed(2)
              .toString()
              .replace('.', ',');
            const priceFixed = product.value / product.qtd;

            return (
              <ContainerProduct key={product.id}>
                <ContainerImage>
                  <ImageCart source={{ uri: product.photo }} />
                </ContainerImage>

                <ContainerText>
                  <TextCart>
                    {product.name} - {product.qtd} und - R$ {priceFormated}
                  </TextCart>
                </ContainerText>
                <ContainerAddOrRemove>
                  <ButtonOrAndRemove
                    sizeButton={35}
                    sizeIcon={20}
                    type="add"
                    onPress={() => {
                      handleAddToCart(
                        product.id,
                        priceFixed,
                        priceFixed,
                        product.name,
                        product.photo
                      );
                    }}
                  />
                  <ButtonOrAndRemove
                    sizeButton={35}
                    sizeIcon={20}
                    type="remove"
                    onPress={() => {
                      handleRemoveToCart(product.id, product.valueFixed);
                    }}
                  />
                </ContainerAddOrRemove>
              </ContainerProduct>
            );
          })}

          <Footer>
            <TextFooter>Quantidade de itens = {totalItems}</TextFooter>
            <TextFooter>Total ={totalItemsValueFormatted}</TextFooter>

            <Button
              title="Comprar"
              light="true"
              onPress={() => {
                handlePayment();
              }}
            />
          </Footer>
        </ContainerCart>
      </Container>
    </PaperProvider>
  );
}
