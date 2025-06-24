import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../../hooks/auth';

// Substitua pelo seu componente de máscara ou use um pacote como react-native-masked-text
import { TextInputMask } from 'react-native-masked-text';

export function Register() {
  const { signOut, user } = useAuth();
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
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

    const obj = {
      name: name,
      phone: phone,
      birthday: dataFormatada,
      email: email,
    };

    const searsh_email = await api.get(
      `clients/searsh_cliente_email.php?email=${email}`
    );
    if (searsh_email.data.success == true) {
      Alert.alert('Alerta', 'Email já Cadastrado');
      return;
    }

    const searsh_phone = await api.get(
      `clients/searsh_cliente_phone.php?phone=${phone}`
    );
    if (searsh_phone.data.success == true) {
      Alert.alert('Alerta', 'Telefone já Cadastrado');
      return;
    }

    await api
      .post('clients/insert_client.php', obj)
      .then(() => {
        setTimeout(() => {
          navigate('Home');
          Alert.alert('Alerta', 'Salvo com sucesso');
        }, 1500);
      })
      .catch((error: any) => Alert.alert('Erro', error));
    setName('');
    setPhone('');
    setDate('');
    setEmail('');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Registro</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                autoComplete="name"
                placeholder="Nome Completo"
                value={name}
                onChangeText={setName}
              />

              <TextInputMask
                style={styles.input}
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
                autoComplete="tel"
                placeholder="Telefone"
                value={phone}
                onChangeText={setPhone}
              />

              <TextInputMask
                style={styles.input}
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY',
                }}
                autoComplete="birthdate-full"
                placeholder="Data de Aniversário"
                value={date}
                onChangeText={setDate}
              />

              <TextInput
                style={styles.input}
                autoComplete="email"
                placeholder="Email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <Button
                title="Enviar"
                light="true"
                onPress={handleRegister}
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 24,
    elevation: 2,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});
