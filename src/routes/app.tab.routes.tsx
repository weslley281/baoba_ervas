import React from 'react';
import { Products } from '../screens/Products';
import { Register } from '../screens/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppStackHomeRoutes } from './app.stackHome.routes';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { SignIn } from '../screens/SignIn';
import { Profile } from '../screens/Profile';
import { AppStackProductsRoutes } from './app.stackProducts.routes';
import { AppStackProfileRoutes } from './app.stackProfile.routes';
import { AppStackCartRoutes } from './app.stackCart.routes';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarActiveBackgroundColor: theme.colors.secondary_light,
        tabBarInactiveTintColor: theme.colors.primary_light,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 70,
        },
      }}
    >
      <Screen
        name="Home"
        component={AppStackHomeRoutes}
        options={{
          tabBarIcon: () => (
            <Feather name="home" size={24} color={theme.colors.primary} />
          ),
        }}
      />

      <Screen
        name="Produtos"
        component={AppStackProductsRoutes}
        options={{
          tabBarIcon: () => (
            <Feather name="archive" size={24} color={theme.colors.primary} />
          ),
        }}
      />

      <Screen
        name="Perfil"
        component={AppStackProfileRoutes}
        options={{
          tabBarIcon: () => (
            <Feather name="user" size={24} color={theme.colors.primary} />
          ),
        }}
      />

      <Screen
        name="Carrinho"
        component={AppStackCartRoutes}
        options={{
          tabBarIcon: () => (
            <Feather
              name="shopping-cart"
              size={24}
              color={theme.colors.primary}
            />
          ),
        }}
      />
    </Navigator>
  );
}
