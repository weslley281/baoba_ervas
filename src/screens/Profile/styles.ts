import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(40)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const ScrollViewProducts = styled.ScrollView``;

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

export const TextInputMasked = styled(TextInputMask)`
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

export const ContainerButton = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ContainerInformations = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;
