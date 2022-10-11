import styled from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 170px;
  background-color: yellowgreen;
  margin-bottom: 10px;
  margin-right: 2%;
  border-radius: 5px;
`;

export const ContainerImageProduct = styled.View`
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

export const ImageProduct = styled.Image`
  height: ${RFPercentage(16)}px;
  width: ${RFPercentage(16)}px;
  border-radius: 10px;
`;

export const ContainerProductDescription = styled.View`
  width: 100%;
  align-items: center;
  padding: 0 8px;
`;

export const ProductName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(13)}px;
  text-align: center;
`;

export const ProductPrice = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
  color: white;
`;
