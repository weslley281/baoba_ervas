import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Button, GoogleIcon, Text } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

export function ButtonWithGoogleIcon({ onPress, title, ...rest }: Props) {
  return (
    <Button onPress={onPress} {...rest}>
      <GoogleIcon />
      <Text>{title}</Text>
    </Button>
  );
}
