import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';
import { Button, ImageContainer, Text } from './styles';

interface Props extends RectButtonProps {
  title: string;
}

export function SignInSocialButton({ title, ...rest }: Props) {
  return (
    <Button {...rest}>
      <ImageContainer></ImageContainer>
      <Text>{title}</Text>
    </Button>
  );
}
