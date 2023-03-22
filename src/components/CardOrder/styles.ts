import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.alert_light};
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 5px;
  flex: 1;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
