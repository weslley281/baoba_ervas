import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import theme from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${theme.colors.primary};
  width: 100%;
  height: ${RFValue(250)}px;
  align-items: center;
  justify-content: center;
`;

export const HeaderContainer = styled.View`
  width: 90%;
  height: 90%;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: ${RFValue(20)}px;
  color: ${theme.colors.shape};
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
  font-family: ${theme.fonts.medium};
  font-size: ${RFValue(20)}px;
  color: ${theme.colors.text_dark};
`;

export const Line = styled.View`
  border: 1px;
  border-color: ${theme.colors.primary};
`;

export const ContainerDescriptions = styled.View`
  flex: 1;
  align-items: flex-end;
`;

export const Descriptions = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${theme.colors.text};
  text-align: justify;
`;

export const ContainerButtonAddOrRemove = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 10px;
`;
