import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(50)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Form = styled.View`
  width: 100%;
  padding: 24px;
  justify-content: space-between;
`;

export const Input = styled.TextInput`
  margin-top: 10px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  width: 100%;
  height: ${RFValue(50)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.text_dark};
  padding: 3px 10px 3px 10px;
  margin-bottom: 5px;
`;

export const Ordination = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(40)}px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
