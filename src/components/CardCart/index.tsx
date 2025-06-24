import { useContext } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CartContext } from '../../contexts/CartContext';
import { Text, StyleSheet, View } from 'react-native';

export function CardCart() {
  const { productsCart } = useContext(CartContext);

  const totalItems = productsCart.reduce(
    (accumulator, product) => accumulator + product.qtd,
    0
  );

  const totalItemsValue = productsCart.reduce(
    (accumulator, product) => accumulator + product.value,
    0
  );

  const totalItemsValueFormatted =
    'R$ ' + totalItemsValue.toFixed(2).replace('.', ',');

  return (
    <View style={styles.container}>
      <View style={styles.containerCart}>
        <AntDesign name="shoppingcart" size={24} color="white" />
        <Text>{totalItems}</Text>
        <Text>= {totalItemsValueFormatted}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    height: 60,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  containerCart: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: 22,
    color: '#e4ee56', // Shape color
    marginLeft: 10,
  },
});