import React from 'react';
import theme from './src/global/styles/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth } from './src/hooks/auth';
import { Routes } from './src/routes';
import CartProvider from './src/contexts/CartContext';
import Overlay from 'react-native-loading-spinner-overlay';

export default function App() {
  const { userStorageLoading } = useAuth();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <CartProvider>
          <Routes />
        </CartProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
