import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import theme from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(300)}px;
  align-items: center;
  justify-content: center;
`;

export const HeaderContainer = styled.View`
  width: 90%;
  height: 90%;
  padding-top: 40px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const ImageProduct = styled.Image`
  margin-top: 10px;
  border-radius: 20px;
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding: 30px 20px;
`;

export const ContainerPrice = styled.View`
  align-items: flex-end;
`;

export const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const Line = styled.View`
  border: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const ContainerDescriptions = styled.View`
  align-items: flex-end;
`;

export const Descriptions = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: justify;
`;
