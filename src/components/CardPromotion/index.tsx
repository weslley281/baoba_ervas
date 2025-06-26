import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface PromotionProps {
  title: string;
  slogan: string;
  image: string;
}

interface Props extends TouchableOpacityProps {
  data: PromotionProps;
}

export function CardPromotion({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <View style={styles.content}>
        <View style={styles.textView}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.slogan}>{data.slogan}</Text>
        </View>
        <Image source={{ uri: data.image }} style={styles.imagePromotion} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: '#fff',
    marginVertical: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  textView: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  slogan: {
    fontSize: 14,
    color: '#666',
  },
  imagePromotion: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
});
