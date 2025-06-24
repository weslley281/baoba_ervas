import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface ordersProps {
  data: {
    order_id: string;
    amount: string;
    type_delivery: string;
    object: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export function CardOrder({ data }: ordersProps) {
  const totalValue = Number(data.amount) / 100;

  const createdDate = new Date(data.createdAt);
  const createdDay = (createdDate.getDate() + 1).toString().padStart(2, '0');
  const createdMonth = (createdDate.getMonth() + 1).toString().padStart(2, '0');
  const createdYear = createdDate.getFullYear();
  const createdDateFormatted = `${createdDay}/${createdMonth}/${createdYear}`;

  const updatedDate = new Date(data.updatedAt);
  const updatedDay = (updatedDate.getDate() + 1).toString().padStart(2, '0');
  const updatedMonth = (updatedDate.getMonth() + 1).toString().padStart(2, '0');
  const updatedYear = updatedDate.getFullYear();
  const updatedDateFormatted = `${updatedDay}/${updatedMonth}/${updatedYear}`;
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>Pedido: </Text>
        <Text style={styles.text}> {data.order_id}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>Total: </Text>
        <Text style={styles.text}> R$ {totalValue.toFixed(2).replace('.', ',')}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>Tipo de entrega: </Text>
        <Text style={styles.text}> {data.type_delivery}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>Forma de pagamento: </Text>
        <Text style={styles.text}> {data.object === 'card' ? 'Cartão' : 'Erro'}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>Status: </Text>
        <Text style={styles.text}> {data.status}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>Data da compra: </Text>
        <Text style={styles.text}> {createdDateFormatted}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>Ultima Alteração: </Text>
        <Text style={styles.text}> {updatedDateFormatted}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8d7da',
    borderRadius: 12,
    padding: 12,
    marginBottom: 5,
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  title: {
    color: '#721c24',
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
  },
  text: {
    color: '#721c24',
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
  },
});
