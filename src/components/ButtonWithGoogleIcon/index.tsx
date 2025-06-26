import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface Props extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

export function ButtonWithGoogleIcon({ onPress, title, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} {...rest}>
      <AntDesign name="google" size={24} color="black" />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#DB4437', // Google red
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 18,
  },
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: 22,
    color: '#e4ee56', // Shape color
    marginLeft: 10,
  },
});
