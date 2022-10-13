import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import theme from './src/global/styles/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { AuthProvider, useAuth } from './src/hooks/auth';
import { Routes } from './src/routes';
import { AppStackRoutes } from './src/routes/app.stack.routes';
import { AppTabRoutes } from './src/routes/app.tab.routes';

export default function App() {
  const { userStorageLoading } = useAuth();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
