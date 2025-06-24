import React, { useCallback, useState } from 'react';
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CardOrder } from '../../components/CardOrder';

interface ordersProps {
  order_id: string;
  amount: string;
  type_delivery: string;
  object: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export function Orders() {
  const { signOut, user } = useAuth();
  const client_id = user.id;

  const { navigate } = useNavigation<any>();
  const [orders, setOrders] = useState<ordersProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function listOrders() {
    try {
      setIsLoading(true);
      const response = await api.get(`orders/id_client/${client_id}`);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      listOrders();
    }, [])
  );

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

            <View style={styles.formContainer}>
              <View style={styles.form}>
                {orders.map((order) => (
                  <CardOrder key={order.order_id} data={order} />
                ))}
              </View>
            </View>
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
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  formContainer: {
    flex: 1,
    marginTop: 8,
  },
  form: {
    flex: 1,
  },
});
