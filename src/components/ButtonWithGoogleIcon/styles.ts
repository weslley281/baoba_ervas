import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const Button = styled(TouchableOpacity)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.google_red};
  border-radius: 5px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  padding: 18px;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(22)}px;
  color: ${({ theme }) => theme.colors.shape};
  margin-left: 10px;
`;

export const GoogleIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'google',
  size: RFValue(22),
  color: theme.colors.google_yellow,
}))``;
