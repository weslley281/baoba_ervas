import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ButtonProps extends TouchableOpacityProps {
  sizeButton: number;
  sizeIcon: number;
  type: 'add' | 'remove';
  onPress: () => void;
}

export function ButtonOrAndRemove({
  sizeButton,
  sizeIcon,
  type,
  onPress,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { width: sizeButton, height: sizeButton }]}
      activeOpacity={0.8}
      onPress={onPress}
      {...rest}
    >
      <MaterialIcons
        name={type === 'add' ? 'add-shopping-cart' : 'remove-shopping-cart'}
        size={sizeIcon}
        color="#fff"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#145291',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  } as ViewStyle,
});
