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

interface Response {
  data: {
    client_id: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export function Checkout() {
  const { signOut, user } = useAuth();
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [isloaded, setIsLoaded] = useState(false);

  const { navigate } = useNavigation<any>();

  async function isRegisteredAddress(client_id: string) {
    try {
      const searsh_address = await api.get(`address/search/${client_id}`);
      return searsh_address.data.client_id;
    } catch (error) {
      console.log(`Não foi possivel buscar Endereço: ${error}`);
      return 0;
    }
  }

  async function listData() {
    try {
      const teste = (await isRegisteredAddress(user.id)) > 0;
      console.log(teste);
      if ((await isRegisteredAddress(user.id)) > 0) {
        console.log('primeiro if');
        try {
          const response: Response = await api.get(`address/search/${user.id}`);
          setAddressLine1(response.data.addressLine1);
          setAddressLine2(response.data.addressLine2);
          setCity(response.data.city);
          setState(response.data.state);
          setPostalCode(response.data.postalCode);
          setCountry(response.data.country);
          setIsLoaded(true);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('else');
        setAddressLine1('');
        setAddressLine2('');
        setCity('');
        setState('Mato Grosso');
        setPostalCode('');
        setCountry('Brasil');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSaveAddress() {
    listData();

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
    console.log(`O email registraso é ${await isRegisteredAddress(user.id)}`);

    if ((await isRegisteredAddress(user.id)) == undefined) {
      try {
        console.log('Executou um Post');
        const response = await api.post('address/create', obj);
        console.log(response.data);
        Alert.alert('Alerta', 'Endereço criado com sucesso');
        navigate('Perfil');
      } catch (error: any) {
        console.log(error);
        Alert.alert('Erro', error.message);
      }
    } else {
      try {
        console.log('Executou um Put');
        const response = await api.put('address/update', obj);
        console.log(response.data);
        Alert.alert('Alerta', 'Endereço alterado com sucesso');
        navigate('Perfil');
      } catch (error: any) {
        console.log(error);
        Alert.alert('Erro', error.message);
      }
    }
  }

  // useEffect(() => {
  //   listData();
  //   console.log(`Os dados de endereço1 é ${addressLine1}`);
  // }, [isloaded]);

  useFocusEffect(
    useCallback(() => {
      listData();
    }, [])
  );

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
                value={addressLine1}
                onChangeText={(text: string) => setAddressLine1(text)}
              />

              <Label>Linha 2:</Label>
              <Input
                placeholder="Quadra 123, perto de algum lugar"
                value={addressLine2}
                onChangeText={(text: string) => setAddressLine2(text)}
              />

              <Label>Cidade:</Label>
              <Input
                placeholder="Sua cidade"
                value={city}
                onChangeText={(text: string) => setCity(text)}
              />

              <Label>Estado:</Label>
              <Input
                value={state}
                onChangeText={(text: string) => setState(text)}
              />

              <Label>País:</Label>
              <Input
                value={country}
                onChangeText={(text: string) => setCountry(text)}
              />

              <Label>Cep:</Label>
              <TextInputMasked
                autoComplete="postal-address"
                placeholder="78000-000"
                type="custom"
                options={{ mask: '99999-999' }}
                value={postalCode}
                onChangeText={(text) => setPostalCode(text)}
              />

              <Button
                title="Alterar"
                light="true"
                onPress={() => {
                  handleSaveAddress();
                }}
              />
            </Form>
          </ContainerForm>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
