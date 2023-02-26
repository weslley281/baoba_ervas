import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button } from '../../components/Button';

import { Container, ContainerCart, Header, Title } from './styles';

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

export function Cart() {
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
            <Title>Meus Produtos</Title>
          </Header>

          <ContainerCart>
            <Button title="Alterar" light="true" onPress={() => {}} />
          </ContainerCart>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
