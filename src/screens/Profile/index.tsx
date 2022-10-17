import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button } from '../../components/Button';

import {
  Container,
  ContainerForm,
  Form,
  Header,
  Input,
  TextInputMasked,
  Title,
} from './styles';

import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../../hooks/auth';
import { ContainerUser } from '../../components/ContainerUser';

interface FormData {
  name: string;
  phone: string;
  email: string;
  cpf: string;
  password: string;
  birthday: Date;
}

export function Profile() {
  const { signOut, user } = useAuth();
  const [id, setId] = useState(user.id);
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.fullName);
  const { navigate, goBack } = useNavigation<any>();

  async function bringResultsOfUser() {
    const searsh_email = await api.get(
      `clients/searsh_cliente_email.php?email=${user.email}`
    );
    if (searsh_email.data.success == true) {
      console.log('Deu certo');
      const result = searsh_email.data.resultado;
      setId(searsh_email.data.resultado.id);
      setName(searsh_email.data.resultado.name);
      setPhone(searsh_email.data.resultado.phone);
      setEmail(searsh_email.data.resultado.email);
      console.log(result.birthday);
    } else {
      console.log(user.email);
      console.log(searsh_email.data.email);
      console.log(searsh_email.data.success);
      console.log('Não deu certo');
    }
  }

  async function handleRegister() {
    const arrayOfName = name.split(' ');
    const arrayOfDate = date.split('/');
    const ano = new Date().getFullYear();
    const anoInvalido = ano - 100;
    const dataFormatada = `${arrayOfDate[2]}-${arrayOfDate[1]}-${arrayOfDate[0]}`;

    if (arrayOfName.length <= 1) {
      Alert.alert('Escreva seu nome completo');
      return;
    }

    if (phone.length < 15) {
      Alert.alert('Escreva um numero de telefone celular válido');
      return;
    }

    if (Number(arrayOfDate[0]) > 31 || Number(arrayOfDate[0]) <= 0) {
      Alert.alert('O dia inserido está incorreto');
      return;
    }

    if (Number(arrayOfDate[1]) > 12 || Number(arrayOfDate[0]) <= 0) {
      Alert.alert('O mês está incorreto');
      return;
    }

    if (Number(arrayOfDate[2]) > ano || Number(arrayOfDate[2]) <= anoInvalido) {
      Alert.alert('O ano inserido é inválido');
      return;
    }

    if (email == '') {
      Alert.alert('Escreva seu email');
      return;
    }

    const obj = {
      id: id,
      name: name,
      phone: phone,
      birthday: dataFormatada,
      email: user.email,
    };
    console.log(obj);

    const searsh_email = await api.get(
      `clients/searsh_cliente_email.php?email=${email}`
    );
    if (searsh_email.data.success == true) {
      console.log('Executou esse');
      await api
        .post('clients/insert_existing_client.php', obj)
        .then(() => {
          setTimeout(() => {
            Alert.alert('Alerta', 'Alterado com sucesso');
          }, 1500);
        })
        .catch((error) => Alert.alert('Erro', error));
    } else {
      console.log('Executou esse outro');
      await api
        .post('clients/insert_client.php', obj)
        .then(() => {
          setTimeout(() => {
            Alert.alert('Alerta', 'Alterado com sucesso');
          }, 1500);
        })
        .catch((error) => Alert.alert('Erro', error));
    }
  }

  useEffect(() => {
    bringResultsOfUser();
  }, []);

  return (
    <KeyboardAvoidingView behavior="height" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <ContainerUser
            name={user.name}
            photo={user.photo}
            signOut={signOut}
          />
          <Header>
            <Title>Meus Dados</Title>
          </Header>

          <ContainerForm>
            <Form>
              <Input
                autoComplete="name"
                name="name"
                placeholder="Nome Completo"
                value={name}
                onChangeText={(text: string) => setName(text)}
              />

              <TextInputMasked
                autoComplete="tel"
                placeholder="Telefone"
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />

              <TextInputMasked
                autoComplete="birthdate-full"
                placeholder="Data de Aniversário"
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY',
                }}
                value={date}
                onChangeText={(text) => setDate(text)}
              />

              <Input
                autoComplete="email"
                name="email"
                placeholder="Email"
                autoCapitalize="none"
                value={email}
                onChangeText={(text: string) => setEmail(text)}
                disabled
              />

              <Button
                title="Alterar"
                light
                onPress={() => {
                  handleRegister();
                }}
              />
            </Form>
          </ContainerForm>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
