import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button } from '../../components/Button';

import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../../hooks/auth';
import { ContainerUser } from '../../components/ContainerUser';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import {
  Container,
  ContainerForm,
  Form,
  Header,
  Input,
  Label,
  TextInputMasked,
  Title,
} from './styles';

export function Checkout() {
  const { signOut, user } = useAuth();
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const { navigate } = useNavigation<any>();

  async function handleSaveAddress() {
    if (
      addressLine1 === '' ||
      city === '' ||
      state == '' ||
      postalCode == '' ||
      country == ''
    ) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    const obj = {
      client_id: user.id,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
    };

    console.log(obj);

    try {
      const response = await api.post('payments/stripe', obj);
      console.log(response.data);
      Alert.alert('Alerta', 'Venda efetuada com sucesso');
      navigate('Perfil');
    } catch (error: any) {
      console.log(error);
      Alert.alert('Erro', error.message);
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
            <Title>Endereço</Title>
          </Header>

          <ContainerForm>
            <Form>
              <Label>Linha 1:</Label>
              <Input
                autoComplete="street-address"
                placeholder="Rua Funano de tal, 123"
                // value={name}
                // onChangeText={(text: string) => setName(text)}
              />

              <Label>Linha 2:</Label>
              <Input
                placeholder="Quadra 123, perto de algum lugar"
                // value={name}
                // onChangeText={(text: string) => setName(text)}
              />

              <Label>Cidade:</Label>
              <Input
                placeholder="Sua cidade"
                // value={name}
                // onChangeText={(text: string) => setName(text)}
              />

              <Label>Estado:</Label>
              <Input
                value="Mato Grosso"
                // onChangeText={(text: string) => setName(text)}
              />

              <Label>País:</Label>
              <Input
                value="Brasil"
                // onChangeText={(text: string) => setName(text)}
              />

              <Label>Cep:</Label>
              <TextInputMasked
                autoComplete="postal-address"
                placeholder="78000-000"
                type="custom"
                options={{ mask: '99999-999' }}
                // value={phone}
                // onChangeText={(text) => setPhone(text)}
              />

              <Button
                title="Alterar"
                light="true"
                // onPress={() => {
                //   handleRegister();
                // }}
              />
            </Form>
          </ContainerForm>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
