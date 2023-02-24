import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Button = styled(TouchableOpacity)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.alert_light};
  border-radius: 5px;
  align-items: center;
  padding: 18px;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text_dark};
`;
