import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  width: 320px;
  height: 180px;
  background-color: yellowgreen;
  border-radius: 5px;
  margin: 10px;
`;

export const Content = styled.View`
  width: 100%;
  padding: 10px;
  flex-direction: row;
`;
export const TextView = styled.View`
  width: 60%;
  margin-right: 10px;
`;
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(18)}px;
`;

export const Slogan = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(14)}px;
`;
export const ImagePromotion = styled.Image`
  height: ${RFValue(100)}px;
  width: ${RFValue(100)}px;
  border-radius: 10px;
`;
