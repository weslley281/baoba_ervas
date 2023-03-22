import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Button } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props extends TouchableOpacityProps {
  icon: string;
  onPress: () => void;
}

export function ButtonWithIcon({ onPress, icon, ...rest }: Props) {
  return (
    <Button onPress={onPress} {...rest}>
      <Icon name={icon} size={45} color="white" />
    </Button>
  );
}
