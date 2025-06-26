import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { AppTabRoutes } from './app.tab.routes';

import { useAuth } from '../hooks/auth';

import { ActivityIndicator, View } from 'react-native';

export function Routes() {
  const { user, loading } = useAuth();

  if (loading) {
    // enquanto carrega o usuário, mostra indicador
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user && user.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
