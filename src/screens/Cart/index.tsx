import React, { useContext, useEffect, useState } from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { Button } from '../../components/Button';

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  BigInput,
  Container,
  ContainerAddOrRemove,
  ContainerCart,
  ContainerImage,
  ContainerProduct,
  ContainerText,
  Footer,
  Form,
  Header,
  ImageCart,
  InputMasckedCard,
  MeddiemForm,
  MeddiumInput,
  SmallForm,
  TextCart,
  TextFooter,
  Title,
} from './styles';
import { CartContext } from '../../contexts/CartContext';
import { useAuth } from '../../hooks/auth';
import { ContainerUser } from '../../components/ContainerUser';
import { ButtonOrAndRemove } from '../../components/ButtonOrAndRemove';
import { api } from '../../services/api';
import { Mask } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

export function Cart() {
  const { signOut, user } = useAuth();
  const { productsCart, addProductToCart, removeProductToCart } =
    useContext(CartContext);

  const [cardNumber, setCardNumber] = useState(0);
  const [expiryMonth, setExpiryMonth] = useState(0);
  const [expiryYear, setExpiryYear] = useState(0);
  const [installments, setInstallments] = useState(0);
  const [object, setObject] = useState('card');

  const [description, setDescription] = useState('Compra geral');
  const [cvc, setCvc] = useState(0);
  const [currency, setCurrency] = useState('brl');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState(0);
  const [type_delivery, setType_delivery] = useState('Retirar na loja');
  // const [addressLine1, setAddressLine1] = useState('');
  // const [addressLine2, setAddressLine2] = useState('');
  // const [city, setCity] = useState('');
  // const [state, setState] = useState('');
  // const [postalCode, setPostalCode] = useState('');
  // const [country, setCountry] = useState('');

  const { navigate } = useNavigation<any>();

  const totalItems = productsCart.reduce(
    (accumulator, product) => accumulator + product.qtd,
    0
  );

  const totalItemsValue = productsCart.reduce(
    (accumulator, product) => accumulator + product.value,
    0
  );

  const [amount, setAmount] = useState(totalItemsValue);

  const handlePayment = async () => {
    setAmount(totalItemsValue);
    const amountFormatted = Math.round(amount * 100);
    console.log('------------------------CLicou------------------');

    if (
      cardNumber === 0 ||
      expiryMonth === 0 ||
      expiryYear === 0 ||
      installments === 0 ||
      amount === 0 ||
      cpf === 0 ||
      cvc === 0 ||
      name === ''
    ) {
      // console.log(`cardNumber = ${cardNumber}`);
      // console.log(`expiryMonth = ${expiryMonth}`);
      // console.log(`expiryYear = ${expiryYear}`);
      // console.log(`installments = ${installments}`);
      // console.log(`cpf = ${cpf}`);
      // console.log(`cvc = ${cvc}`);
      // console.log(`name = ${name}`);
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    const obj = {
      user_id: user.id,
      user_email: user.email,
      user_name: user.name,
      amount: amountFormatted,
      currency,
      description,
      type_delivery,
      source: {
        object,
        number: cardNumber.toString(),
        exp_month: expiryMonth.toString(),
        exp_year: expiryYear.toString(),
        cvc: cvc.toString(),
        installments,
      },
    };

    console.log(obj);

    try {
      const response = await api.post('payments/stripe', obj);
      console.log(response.data);
      Alert.alert('Alerta', 'Venda efetuada com sucesso');
      navigate('Checkout');
    } catch (error: any) {
      console.log(error);
      Alert.alert('Erro', error.message);
    }
  };

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

  function changeDate(text: string) {
    const date = text.split('/');
    setExpiryMonth(Number(date[0]));
    setExpiryYear(Number(date[1]));
  }

  function handleCardNumberChange(text: any) {
    const cleanedText = text.replace(/\s+/g, ''); // remove espaços em branco da string
    setCardNumber(Number(cleanedText));
  }

  function handleCpf(text: any) {
    const cleanedText = text.replace(/[^\d]/g, ''); // remove espaços em branco da string
    setCpf(Number(cleanedText));
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

            <Form>
              <TextFooter>Nome:</TextFooter>
              <BigInput
                onChangeText={(text: string) => setName(text)}
                value={name}
                placeholder="fulano de tal"
              />

              <TextFooter>Numero do Cartão:</TextFooter>
              <InputMasckedCard
                type={'credit-card'}
                placeholder="4242 4242 4242 4242"
                onChangeText={(text) => handleCardNumberChange(text)}
              />

              <MeddiemForm>
                <SmallForm>
                  <TextFooter>Data:</TextFooter>
                  <MeddiumInput
                    type="custom"
                    options={{ mask: '99/99' }}
                    onChangeText={(text) => changeDate(text)}
                    placeholder="12/24"
                  />
                </SmallForm>
                <SmallForm>
                  <TextFooter>Cvc:</TextFooter>
                  <MeddiumInput
                    type="custom"
                    options={{ mask: '999' }}
                    onChangeText={(text) => setCvc(Number(text))}
                    maxLength={16}
                    placeholder="123"
                  />
                </SmallForm>
              </MeddiemForm>

              <TextFooter>Cpf:</TextFooter>
              <InputMasckedCard
                type="cpf"
                onChangeText={(text) => handleCpf(text)}
                maxLength={16}
                placeholder="000.000.000-00"
              />

              <TextFooter>Numero de Parcelas:</TextFooter>
              <BigInput
                onChangeText={(text: string) => setInstallments(Number(text))}
                placeholder=""
              />
            </Form>

            {/* <Button
              title="Comprar"
              light="true"
              onPress={() => {
                handlePayment();
              }}
            /> */}

            <Button
              title="Comprar"
              light="true"
              onPress={() => {
                navigate('Checkout');
              }}
            />
          </Footer>
        </ContainerCart>
      </Container>
    </TouchableWithoutFeedback>
  );
}
