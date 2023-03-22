import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Button = styled(TouchableOpacity)`
  width: 80px;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 3px;
`;
