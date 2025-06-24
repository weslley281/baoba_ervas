import React, { useContext } from 'react';
import { Linking, ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ProductsProps } from '../../DTO/ProductsDTO';
import { CartContext } from '../../contexts/CartContext';
import { Button } from '../../components/Button';
import { CardCart } from '../../components/CardCart';
import { ButtonOrAndRemove } from '../../components/ButtonOrAndRemove';

interface Params {
  product: ProductsProps;
  goBack: () => void;
}

export function ProductDetail() {
  const { params } = useRoute();
  const { product } = params as Params;
  const price = product.price.toString().replace('.', ',');

  const { addProductToCart, removeProductToCart } = useContext(CartContext);

  function redirectToWhatsapp() {
    Linking.openURL(
      `https://api.whatsapp.com/send?phone=556533621007&text=Olá%20tenho%20interesse%20em%20comprar%20o%20produto:%20${product.name}`
    );
  }

  function handleAddToCart(
    id: number,
    value: number,
    valueFixed: number,
    name: string,
    photo: string
  ) {
    addProductToCart(id, value, valueFixed, name, photo);
  }

  function handleRemoveToCart(id: number, value: number) {
    removeProductToCart(id, value);
  }

  return (
    <View style={styles.container}>
      <CardCart />
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <Image source={{ uri: product.image }} style={styles.imageProduct} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.containerPrice}>
          <Text style={styles.price}>R$ {price}</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.containerDescriptions}>
          <ScrollView>
            <Text style={styles.descriptions}>
              {product.description
                ? product.description
                : 'Haverá aqui um testo que descreverá esse produto, como o seu uso, igredientes e modo de preparo\n'}
            </Text>
          </ScrollView>

          <View style={styles.containerButtonAddOrRemove}>
            <ButtonOrAndRemove
              sizeButton={50}
              sizeIcon={30}
              type="remove"
              onPress={() => {
                handleRemoveToCart(product.product_id, product.price);
              }}
            />
            <ButtonOrAndRemove
              sizeButton={50}
              sizeIcon={30}
              type="add"
              onPress={() => {
                handleAddToCart(
                  product.product_id,
                  product.price,
                  product.price,
                  product.name,
                  product.image
                );
              }}
            />
          </View>
          <Button
            title="Tenho interesse"
            light="true"
            onPress={redirectToWhatsapp}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 24,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
    color: '#222',
  },
  imageProduct: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  containerPrice: {
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388e3c',
  },
  line: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  containerDescriptions: {
    flex: 1,
    marginBottom: 16,
  },
  descriptions: {
    fontSize: 16,
    color: '#444',
    marginBottom: 16,
  },
  containerButtonAddOrRemove: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
});
