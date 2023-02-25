import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Container, Title } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  color?: string;
  onPress: () => void;
  light: 'true' | 'false';
  icon?: string;
}

export function Button({ title, color, light, icon, onPress, ...rest }: Props) {
  const theme = useTheme();
  return (
    <Container
      color={color ? color : theme.colors.primary}
      onPress={onPress}
      {...rest}
    >
      <Title light={light}>{title}</Title>
    </Container>
  );
}
