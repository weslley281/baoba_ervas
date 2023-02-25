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
} from './styles';
import { useAuth } from '../../hooks/auth';
import { ContainerUser } from '../../components/ContainerUser';

export function Dashboard() {
  const theme = useTheme();
  const { navigate, goBack } = useNavigation<any>();
  const { signOut, user } = useAuth();

  function handleScreenRegister() {
    navigate('Perfil');
  }

  function handleScreenProducts() {
    console.log('voce clicou');
    navigate('Products');
  }

  return (
    <Container>
      <Header>
        <ContainerUser name={user.name} photo={user.photo} signOut={signOut} />
        <ContainerLogo>
          <Logo source={require('../../images/logo_baoba.png')} />
        </ContainerLogo>

        <ContainerTitle>
          <Title>Clube Baobá</Title>
          <Slogan>Um clube de ofertas, sorteios e saúde.</Slogan>
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
    </Container>
  );
}
