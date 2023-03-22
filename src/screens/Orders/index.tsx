import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button } from '../../components/Button';

import {
  Container,
  ContainerForm,
  Form,
  Header,
  Input,
  Title,
  Text,
} from './styles';

import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { ContainerUser } from '../../components/ContainerUser';
import { useTheme } from 'styled-components';
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
  const theme = useTheme();
  const client_id = user.id;

  const { navigate } = useNavigation<any>();
  const [orders, setOrders] = useState<ordersProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);

  async function listOrders() {
    try {
      setIsLoading(true);
      const response = await api.get(`orders/id_client/${client_id}`);
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // useEffect(() => {
  //   listOrders();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      listOrders();
    }, [])
  );

  return (
    <KeyboardAvoidingView behavior="height" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
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
                {orders.map((order) => (
                  <CardOrder key={order.order_id} data={order} />
                ))}
              </Form>
            </ContainerForm>
          </Container>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
