import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { ProductsProps } from '../../DTO/ProductsDTO';

interface Props extends RectButtonProps {
  data: ProductsProps;
}

export function CardProducts({ data, ...rest }: Props) {
  const price = data.price.toString().replace('.', ',');

  return (
    <RectButton style={styles.container} {...rest}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: data.image }} style={styles.image} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.price}>R$ {price}</Text>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
    padding: 12,
    elevation: 2,
  },
  imageContainer: {
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
    width: 64,
    height: 64,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 64,
    height: 64,
    resizeMode: 'cover',
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#4CAF50',
  },
});
