import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  color?: string;
}

interface ButtonTextProps {
  light: boolean;
}

export const Container = styled(TouchableOpacity)<ButtonProps>`
  width: 100%;
  background-color: ${({ color }) => color};
  border-radius: 5px;
  align-items: center;
  padding: 18px;
`;

export const Title = styled.Text<ButtonTextProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, light }) =>
    light ? theme.colors.shape : theme.colors.text_dark};
`;
