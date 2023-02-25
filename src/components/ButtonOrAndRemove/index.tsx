import { TouchableOpacityProps } from 'react-native';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import { Container } from './styles';

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
    <Container size={sizeButton} onPress={onPress} {...rest}>
      <FontistoIcon
        name={type == 'add' ? 'shopping-basket-add' : 'shopping-basket-remove'}
        size={sizeIcon}
        color="white"
      />
    </Container>
  );
}
