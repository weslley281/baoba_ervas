import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const googleIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
    <path d="M12 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zm4.4 5.6h-1.33c-.26 0-.47.21-.47.47v1.33c0 .26.21.47.47.47h1.33v1.33c0 .26.21.47.47.47h1.33c.26 0 .47-.21.47-.47v-1.33c0-.26-.21-.47-.47-.47h-1.33v-1.33c0-.26-.21-.47-.47-.47zm-8.8 0h1.33c.26 0 .47.21.47.47v1.33c0 .26-.21.47-.47.47H6.8v1.33c0 .26-.21.47-.47.47H5a.47.47 0 01-.47-.47v-1.33c0-.26.21-.47.47-.47h1.33v-1.33c0-.26.21-.47.47-.47zm7.57 8.8a4.92 4.92 0 01-1.6.27c-1.22 0-2.26-.43-3.1-1.16l-.88.88c.97.96 2.28 1.55 3.98 1.55 3.11 0 5.5-2.39 5.5-5.5s-2.39-5.5-5.5-5.5c-1.7 0-3.01.61-3.97 1.57l.89.88c.86-.85 1.91-1.28 3.08-1.28a4.14 4.14 0 014.2 4.13c0 2.29-1.92 4.13-4.2 4.13z"/>
  </svg>
`;

export const Button = styled(TouchableOpacity)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.google_red};
  border-radius: 5px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  padding: 18px;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(22)}px;
  color: ${({ theme }) => theme.colors.text_dark};
  margin-left: 10px;
`;

export const GoogleIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'google',
  size: RFValue(22),
  color: theme.colors.text_dark,
}))``;
