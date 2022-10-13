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
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import GoogleSvg from '../../assets/google.svg';

interface FormData {
  name: string;
  phone: string;
  email: string;
  cpf: string;
  password: string;
  birthday: Date;
}

export function SignIn() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google');
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <Title>Faça o seu cadastro ou entre com sua conta Google</Title>
          </Header>

          <Form>
            <SignInSocialButton
              title="Entrar com a Google"
              onPress={handleSignInWithGoogle}
            />
          </Form>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
