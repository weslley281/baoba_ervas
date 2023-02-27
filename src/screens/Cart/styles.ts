import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

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

export const ContainerProduct = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.alert_light};
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
  margin: 3px 0;
`;

export const ContainerImage = styled.View`
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
`;

export const ImageCart = styled.Image`
  width: 50px;
  height: 50px;
`;

export const ContainerText = styled.View`
  width: 60%;
  flex-direction: row;
  align-items: center;
`;

export const ContainerAddOrRemove = styled.View`
  width: 20%;
  flex-direction: row;
  justify-content: space-between;
`;

export const TextCart = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(13)}px;
  color: ${({ theme }) => theme.colors.shape};
  margin-left: 10px;
`;

export const ContainerCart = styled.ScrollView`
  padding: 10px 10px;
`;

export const Footer = styled.View`
  width: 100%;
  padding: 10px 0;
`;

export const TextFooter = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(13)}px;
  color: ${({ theme }) => theme.colors.text_dark};
  margin-left: 10px;
`;

export const Form = styled.View``;
