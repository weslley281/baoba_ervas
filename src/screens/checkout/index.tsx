import React, { useCallback, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../../hooks/auth';
import { ContainerUser } from '../../components/ContainerUser';
import { useFocusEffect } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

interface Response {
  data: {
    client_id: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export function Checkout() {
  const { signOut, user } = useAuth();
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [isloaded, setIsLoaded] = useState(false);

  const { navigate } = useNavigation<any>();

  async function isRegisteredAddress(client_id: string) {
    try {
      const searsh_address = await api.get(`address/search/${client_id}`);
      return searsh_address.data.client_id;
    } catch (error) {
      console.log(`Não foi possivel buscar Endereço: ${error}`);
      return 0;
    }
  }

  async function listData() {
    try {
      const teste = (await isRegisteredAddress(user.id)) > 0;
      if ((await isRegisteredAddress(user.id)) > 0) {
        try {
          const response: Response = await api.get(`address/search/${user.id}`);
          setAddressLine1(response.data.addressLine1);
          setAddressLine2(response.data.addressLine2);
          setCity(response.data.city);
          setState(response.data.state);
          setPostalCode(response.data.postalCode);
          setCountry(response.data.country);
          setIsLoaded(true);
        } catch (error) {
          console.log(error);
        }
      } else {
        setAddressLine1('');
        setAddressLine2('');
        setCity('');
        setState('Mato Grosso');
        setPostalCode('');
        setCountry('Brasil');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSaveAddress() {
    listData();

    if (
      addressLine1 === '' ||
      city === '' ||
      state == '' ||
      postalCode == '' ||
      country == ''
    ) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    const obj = {
      client_id: user.id,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
    };

    if ((await isRegisteredAddress(user.id)) == undefined) {
      try {
        await api.post('address/create', obj);
        Alert.alert('Alerta', 'Endereço criado com sucesso');
        navigate('Perfil');
      } catch (error: any) {
        Alert.alert('Erro', error.message);
      }
    } else {
      try {
        await api.put('address/update', obj);
        Alert.alert('Alerta', 'Endereço alterado com sucesso');
        navigate('Perfil');
      } catch (error: any) {
        Alert.alert('Erro', error.message);
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      listData();
    }, [])
  );

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <ContainerUser
            name={user.name}
            photo={user.photo!}
            signOut={signOut}
          />
          <View style={styles.header}>
            <Text style={styles.title}>Endereço</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.form}>
              <Text style={styles.label}>Linha 1:</Text>
              <TextInput
                style={styles.input}
                autoComplete="street-address"
                placeholder="Rua Funano de tal, 123"
                value={addressLine1}
                onChangeText={setAddressLine1}
              />

              <Text style={styles.label}>Linha 2:</Text>
              <TextInput
                style={styles.input}
                placeholder="Quadra 123, perto de algum lugar"
                value={addressLine2}
                onChangeText={setAddressLine2}
              />

              <Text style={styles.label}>Cidade:</Text>
              <TextInput
                style={styles.input}
                placeholder="Sua cidade"
                value={city}
                onChangeText={setCity}
              />

              <Text style={styles.label}>Estado:</Text>
              <TextInput
                style={styles.input}
                value={state}
                onChangeText={setState}
              />

              <Text style={styles.label}>País:</Text>
              <TextInput
                style={styles.input}
                value={country}
                onChangeText={setCountry}
              />

              <Text style={styles.label}>Cep:</Text>
              <TextInputMask
                style={styles.input}
                autoComplete="postal-address"
                placeholder="78000-000"
                type={'custom'}
                options={{ mask: '99999-999' }}
                value={postalCode}
                onChangeText={setPostalCode}
              />

              <Button
                title="Alterar"
                light="true"
                onPress={handleSaveAddress}
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
    padding: 16,
  },
  header: {
    marginTop: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    marginTop: 16,
  },
  form: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
});
