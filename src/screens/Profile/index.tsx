import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { ContainerUser } from '../../components/ContainerUser';
import { useNavigation } from '@react-navigation/native';
import { ButtonWithIcon } from '../../components/ButtonWithIcon';

export function Profile() {
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation<any>();
  const [client_id, setClient_id] = useState(user.id);
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.fullName);
  const [birthday, setBirthday] = useState('');
  const [dateMoment, setDateMoment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [changes, setChanges] = useState(false);

  async function isRegisteredEmail(email: string) {
    try {
      const searsh_email = await api.get(`clients/email/${email}`);
      return searsh_email.data.id;
    } catch (error) {
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

          const birthdayDate = new Date(response.data.birthday);
          const birthdayFormatted = `${birthdayDate.getDate() + 1}/${
            birthdayDate.getMonth() + 1
          }/${birthdayDate.getFullYear()}`;

          setBirthday(birthdayFormatted);
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

  useEffect(() => {
    listData();
  }, []);

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <ContainerUser
              name={user.name}
              photo={user.photo!}
              signOut={signOut}
            />
            <View style={styles.header}>
              <Text style={styles.title}>Meus Dados</Text>
            </View>

            {isLoading ? (
              <View style={styles.loadContainer}>
                <ActivityIndicator size="large" color={"blue"} />
              </View>
            ) : changes ? (
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  autoComplete="name"
                  placeholder="Nome Completo"
                  value={name}
                  onChangeText={setName}
                />

                <TextInput
                  style={styles.input}
                  autoComplete="tel"
                  placeholder="Telefone"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />

                <TextInput
                  style={styles.input}
                  autoComplete="birthdate-full"
                  placeholder="Data de Aniversário"
                  value={dateMoment}
                  onChangeText={setDate}
                />

                <TextInput
                  style={styles.input}
                  autoComplete="email"
                  placeholder="Email"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />

                <Button
                  title="Salvar"
                  light="true"
                  onPress={handleRegister}
                />

                <Button
                  color={"red"}
                  title="Cancelar"
                  light="true"
                  onPress={() => setChanges(false)}
                />
              </View>
            ) : (
              <View style={styles.form}>
                <View style={styles.containerButton}>
                  <ButtonWithIcon
                    icon="user-edit"
                    onPress={() => setChanges(true)}
                  />
                  <ButtonWithIcon
                    icon="address-book"
                    onPress={() => navigate('Checkout')}
                  />
                  <ButtonWithIcon
                    icon="box"
                    onPress={() => navigate('Orders')}
                  />
                </View>
                <View style={styles.containerInformations}>
                  <Text style={styles.infoText}>Nome: {name}</Text>
                  <Text style={styles.infoText}>Telefone: {phone}</Text>
                  <Text style={styles.infoText}>Aniversário: {birthday}</Text>
                  <Text style={styles.infoText}>Email: {email}</Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  loadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
  },
  form: {
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  containerInformations: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 6,
  },
});
