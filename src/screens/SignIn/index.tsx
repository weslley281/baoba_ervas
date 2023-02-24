import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
// import { Button } from '../../components/Button';
import {
  Container,
  ContainerButton,
  ContainerIcon,
  ContainerLogo,
  ContainerSocialButton,
  Form,
  Header,
  Logo,
  Title,
} from './styles';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';
import { AntDesign } from '@expo/vector-icons';
import { SignInSocialButton } from '../../components/SignInSocialButton';

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
            <ContainerLogo>
              <Logo source={require('../../images/logo_baoba.png')} />
            </ContainerLogo>
            <Title>Faça o seu cadastro ou entre com sua conta Google</Title>
          </Header>

          <Form>
            <ContainerSocialButton>
              <ContainerIcon>
                <AntDesign name="google" size={24} color="#FBBC05" />
              </ContainerIcon>

              <SignInSocialButton
                title="Login"
                onPress={handleSignInWithGoogle}
              />
            </ContainerSocialButton>
          </Form>

          {isLoading && (
            <ActivityIndicator
              color={theme.colors.primary_light}
              size="large"
              style={{ marginTop: 18 }}
            />
          )}
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
