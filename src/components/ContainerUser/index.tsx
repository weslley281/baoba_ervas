import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Props {
  name: string;
  photo: string | undefined;
  signOut: () => void;
}

export function ContainerUser({ name, photo, signOut }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.userWrapper}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: photo }}
            style={styles.photo}
          />
          <View style={styles.user}>
            <Text style={styles.userGreeting}>Olá, </Text>
            <Text style={styles.userName}>{name}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
          <Feather name="log-out" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userGreeting: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    padding: 8,
  },
});
