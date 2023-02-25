import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  height: ${RFValue(60)}px;
  justify-content: center;
  align-items: flex-end;
  justify-content: center;
`;

export const ContainerCart = styled.View`
  margin-right: 10px;
  flex-direction: row;
  align-items: center;
`;

export const Quantidade = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.shape};
  margin-left: 10px;
`;
