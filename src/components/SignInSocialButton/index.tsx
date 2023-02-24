import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Button, Text } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

export function SignInSocialButton({ onPress, title, ...rest }: Props) {
  return (
    <Button onPress={onPress} {...rest}>
      <Text>{title}</Text>
    </Button>
  );
}
