import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button';
import { CardPromotion } from '../../components/CardPromotion';
import { cardsPromotion } from '../../utils/cardsPromotion';
import { useAuth } from '../../hooks/auth';
import { ContainerUser } from '../../components/ContainerUser';

export function Dashboard() {
  const { navigate } = useNavigation<any>();
  const { signOut, user } = useAuth();

  function handleScreenRegister() {
    navigate('Perfil');
  }

  function handleScreenProducts() {
    console.log('voce clicou');
    navigate('Products');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ContainerUser name={user.name} photo={user.photo} signOut={signOut} />
        <View style={styles.logoContainer}>
          <Image
            source={require('../../images/logo_baoba.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Clube Baobá</Text>
          <Text style={styles.slogan}>Um clube de ofertas, sorteios e saúde.</Text>
        </View>
      </View>

      <FlatList
        data={cardsPromotion}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => (
          <CardPromotion data={item} onPress={() => {}} />
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  logoContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 60,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  slogan: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  flatListContent: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});
