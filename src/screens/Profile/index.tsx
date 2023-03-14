import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button } from '../../components/Button';
import moment from 'moment';

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
import { useAuth } from '../../hooks/auth';
import { ContainerUser } from '../../components/ContainerUser';
import { useTheme } from 'styled-components';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LoadContainer } from '../Products/styles';

export function Profile() {
  const { signOut, user } = useAuth();
  const theme = useTheme();
  const { navigate } = useNavigation<any>();
  const [client_id, setClient_id] = useState(user.id);
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.fullName);
  const [birthday, setBirthday] = useState<Date | string>(new Date());
  const [dateMoment, setDateMoment] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      if ((await isRegisteredEmail(user.email)) > 0) {
        try {
          const response = await api.get(`clients/email/${user.email}`);
          setPhone(response.data.phone);
          setName(response.data.name);
          setEmail(response.data.email);

          console.log(response.data.birthday);
          console.log(birthday);

          setBirthday(response.data.birthday);

          // const dateMomentLocal = moment(response.data.birthday);
          // const dateFormattedMoment = dateMomentLocal.format('DD/MM/YYYY');
          const dateDB = new Date(response.data.birthday);
          const dateDBFormatted = `${dateDB.getDate() + 1}/${
            dateDB.getMonth() + 1
          }/${dateDB.getFullYear()}`;
          setDateMoment(dateDBFormatted);

          const arrayBirthday = birthday.toString().split('-');
          const day = arrayBirthday[2];
          const month = arrayBirthday[1];
          const year = arrayBirthday[0];
          const dateFormatted = `${day}/${month}/${year}`;

          setDate(dateFormatted);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

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

    if ((await isRegisteredEmail(user.email)) > 0) {
      await api
        .put('clients/update', obj)
        .then(() => {
          setTimeout(() => {
            Alert.alert('Alerta', 'Alterado com sucesso');
          }, 1500);
        })
        .catch((error) => Alert.alert('Erro', error));
    } else {
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
  // }, [birthday]);

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
            <Title>Meus Dados</Title>
          </Header>

          {isLoading ? (
            <LoadContainer>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </LoadContainer>
          ) : (
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
                  value={dateMoment}
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

                <Button
                  color={theme.colors.alert_light}
                  light="true"
                  title="Alterar o Endereço"
                  onPress={() => navigate('Checkout')}
                />
              </Form>
            </ContainerForm>
          )}
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
