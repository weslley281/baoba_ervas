import React, { useState } from 'react';
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

interface FormData {
  name: string;
  phone: string;
  email: string;
  cpf: string;
  password: string;
  birthday: Date;
}

export function Register() {
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [sucess, setSucess] = useState(false);
  const { navigate, goBack } = useNavigation<any>();

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

    setSucess(true);

    const obj = {
      name: name,
      phone: phone,
      birthday: dataFormatada,
      email: email,
    };

    try {
      await api.post('clients/insert_client.php', obj);
      setName('');
      setPhone('');
      setDate('');
      setEmail('');
    } catch (error) {
      Alert.alert('Ops', 'Alguma coisa deu errado, tente novamente.');
      // console.log(obj);
      console.log(error);
      setSucess(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <Title>Registro</Title>
          </Header>

          <ContainerForm>
            <Form>
              <Input
                autoComplete="name"
                name="name"
                placeholder="Nome Completo"
                value={name}
                onChangeText={(text) => setName(text)}
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
                value={email}
                onChangeText={(text) => setEmail(text)}
              />

              <Button
                title="Enviar"
                light
                onPress={() => {
                  setSucess(true);
                  handleRegister().then(() => {
                    setTimeout(() => {
                      setSucess(false);
                      navigate('DashBoard');
                      Alert.alert('Salvo com sucesso');
                    }, 1500);
                  });
                }}
              />
            </Form>
          </ContainerForm>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
