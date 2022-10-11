import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import {
  Container,
  Content,
  ImagePromotion,
  Slogan,
  TextView,
  Title,
} from './styles';

interface PromotionProps {
  title: string;
  slogan: string;
  image: string;
}

interface Props extends RectButtonProps {
  data: PromotionProps;
}

export function CardPromotion({ data, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Content>
        <TextView>
          <Title>{data.title}</Title>
          <Slogan>{data.slogan}</Slogan>
        </TextView>

        <ImagePromotion source={{ uri: data.image }} />
      </Content>
    </Container>
  );
}
