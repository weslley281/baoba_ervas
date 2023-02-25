import React, { useCallback, useEffect, useState } from 'react';
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
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

interface User {
  name: string;
  phone: string;
  email: string;
  client_id: string;
  birthday: Date;
}

export function Profile() {
  const { signOut, user } = useAuth();
  const [client_id, setClient_id] = useState(user.id);
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.fullName);
  const [birthday, setBirthday] = useState(new Date());
  const [data, setData] = useState<User[]>([]);
  const { navigate, goBack } = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  async function isRegisteredEmail(email: string) {
    try {
      const searsh_email = await api.get(`clients/email/${email}`);
      return searsh_email.data.id;
    } catch (error) {
      console.log(`Não foi possivel buscar email: ${error}`);
      return 0;
    }
  }

  async function listData() {
    try {
      console.log(`https://appbaoba.herokuapp.com/clients/email/${user.email}`);

      console.log(
        `O primeiro retorno é: ${await isRegisteredEmail(user.email)}`
      );
      if ((await isRegisteredEmail(user.email)) > 0) {
        try {
          setIsLoading(true);
          const response = await api.get(
            `https://appbaoba.herokuapp.com/clients/email/${user.email}`
          );
          setPhone(response.data.phone);
          setName(response.data.name);
          setEmail(response.data.email);
          setBirthday(response.data.birthday);
          setClient_id(response.data.client_id);
          console.log('esse é o aniver do servidor: ' + response.data.birthday);
          console.log('esse é o aniver: ' + birthday);
          const arrayBirthday = birthday.toString().split('-');
          const day = arrayBirthday[2];
          const month = arrayBirthday[1];
          const year = arrayBirthday[0];
          const dateFormated = `${day}/${month}/${year}`;
          console.log('esse é o aniver formatado: ' + dateFormated);
          setDate(dateFormated);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // async function bringResultsOfUser() {
  //   const response = await api.get(
  //     `clients/searsh_cliente_email.php?email=${user.email}`
  //   );
  //   if (response.data.success == true) {
  //     try {
  //       setData(response.data.resultado);

  //       data.map((item) => {
  //         setName(item.name);
  //         setPhone(item.phone);
  //         setEmail(item.email);
  //         setId(item.id_google);
  //         setBirthday(item.birthday);
  //       });
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   } else {
  //     console.log('Não deu certo');
  //   }
  // }

  async function handleRegister() {
    const arrayOfName = name!.split(' ');
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
      client_id: client_id,
      name: name,
      phone: phone,
      birthday: dataFormatada,
      email: user.email,
    };
    // console.log(obj);

    if ((await isRegisteredEmail(user.email)) > 0) {
      console.log('Executou esse');
      await api
        .post('https://appbaoba.herokuapp.com/clients/create', obj)
        .then(() => {
          setTimeout(() => {
            Alert.alert('Alerta', 'Alterado com sucesso');
          }, 1500);
        })
        .catch((error) => Alert.alert('Erro', error));
    } else {
      console.log('Executou esse outro');
      console.log(obj);
      await api
        .post('clients/create', obj)
        .then(() => {
          setTimeout(() => {
            Alert.alert('Alerta', 'Alterado com sucesso');
          }, 1500);
        })
        .catch((error) => Alert.alert('Erro', error));
    }
  }

  // useEffect(() => {
  //   listData();
  //   // console.log(data);
  // }, []);

  useEffect(() => {
    listData();
    // console.log(data);
  }, [isFocused, birthday]);

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
            <Title>Meus Dados</Title>
          </Header>

          <ContainerForm>
            <Form>
              <Input
                autoComplete="name"
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
                placeholder="Email"
                autoCapitalize="none"
                value={email}
                onChangeText={(text: string) => setEmail(text)}
              />

              <Button
                title="Alterar"
                light="true"
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
