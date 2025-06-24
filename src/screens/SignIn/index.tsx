import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { useAuth } from '../../hooks/auth';
import { ButtonWithGoogleIcon } from '../../components/ButtonWithGoogleIcon';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();

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
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../images/logo_baoba.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.title}>
              Faça o seu cadastro ou entre com sua conta Google
            </Text>
          </View>

          <View style={styles.form}>
            <ButtonWithGoogleIcon
              title="Login com o Google"
              onPress={handleSignInWithGoogle}
            />
          </View>

          {isLoading && (
            <ActivityIndicator
              color="#6C63FF"
              size="large"
              style={{ marginTop: 18 }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  form: {
    marginTop: 24,
    alignItems: 'center',
  },
});
