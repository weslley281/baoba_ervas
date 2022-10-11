import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { CardPromotion } from '../../components/CardPromotion';
import { cardsPromotion } from '../../utils/cardsPromotion';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  ContainerLogo,
  ContainerTitle,
  Header,
  Logo,
  Slogan,
  Title,
  ContainerButton,
  Footer,
} from './styles';

export function Dashboard() {
  const theme = useTheme();
  const { navigate, goBack } = useNavigation<any>();

  function handleScreenRegister() {
    navigate('Register');
  }

  function handleScreenProducts() {
    console.log('voce clicou');
    navigate('Products');
  }

  return (
    <Container>
      <Header>
        <ContainerLogo>
          <Logo source={require('../../images/logo_baoba.png')} />
        </ContainerLogo>

        <ContainerTitle>
          <Title>Clube Baobá</Title>
          <Slogan>Um clube de ofertas, sorteios e saúde.</Slogan>

          <ContainerButton>
            <Button
              title="Faça o seu Cadastro"
              color={theme.colors.shape}
              onPress={handleScreenRegister}
            />
          </ContainerButton>
        </ContainerTitle>
      </Header>

      <FlatList
        data={cardsPromotion}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => (
          <CardPromotion data={item} onPress={() => {}} />
        )}
      />

      <Footer>
        <Button
          title="Ver todos os Produtos"
          onPress={handleScreenProducts}
          light
        />
      </Footer>
    </Container>
  );
}
