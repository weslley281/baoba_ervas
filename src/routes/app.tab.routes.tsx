import React from 'react';
import { Products } from '../screens/Products';
import { Register } from '../screens/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppStackRoutes } from './app.stack.routes';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { SignIn } from '../screens/SignIn';
import { Profile } from '../screens/Profile';

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
        component={AppStackRoutes}
        options={{
          tabBarIcon: () => (
            <Feather name="home" size={24} color={theme.colors.primary} />
          ),
        }}
      />
      <Screen
        name="Produtos"
        component={Products}
        options={{
          tabBarIcon: () => (
            <Feather name="archive" size={24} color={theme.colors.primary} />
          ),
        }}
      />

      <Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Feather name="user" size={24} color={theme.colors.primary} />
          ),
        }}
      />

      {/* <Screen
        name="SignIn"
        component={SignIn}
        options={{
          tabBarIcon: () => (
            <Feather name="users" size={24} color={theme.colors.primary} />
          ),
        }}
      /> */}
    </Navigator>
  );
}
