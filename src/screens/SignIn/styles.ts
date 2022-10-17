import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';
import { RectButton } from 'react-native-gesture-handler';

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

export const ContainerSocialButton = styled.View`
  width: 100%;
  height: ${RFValue(48)}px;
  flex-direction: row;
  background-color: red;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #ea4335;
`;

export const ContainerIcon = styled.View`
  width: ${RFValue(50)}px;
  align-items: center;
  justify-content: center;
`;

export const ContainerButton = styled.View`
  flex: 1;
`;

export const SocialButton = styled.Button``;
