import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface Props extends TouchableOpacityProps {
  icon: any;
  onPress: () => void;
}

export function ButtonWithIcon({ onPress, icon, ...rest }: Props) {
  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      <FontAwesome5 name={icon} size={24} color="black" />
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
