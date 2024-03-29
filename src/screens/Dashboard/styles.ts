import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(350)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const ContainerLogo = styled.View`
  width: 100%;
  height: ${RFValue(150)}px;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: ${RFValue(250)}px;
  height: ${RFValue(50)}px;
  border-radius: 10px;
`;

export const ContainerTitle = styled.View`
  width: 100%;
  height: ${RFValue(60)}px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const Slogan = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(15)}px;
  text-align: center;
`;
