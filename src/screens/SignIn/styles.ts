import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(300)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  padding-top: 30px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.shape};
  text-align: center;
`;

export const ScrollViewProducts = styled.ScrollView``;

export const Form = styled.View`
  width: 100%;
  padding: 24px;
  justify-content: space-between;
`;

export const ContainerLogo = styled.View`
  width: 100%;
  height: ${RFValue(150)}px;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
`;

export const Logo = styled.Image`
  width: ${RFValue(250)}px;
  height: ${RFValue(50)}px;
  border-radius: 10px;
`;
