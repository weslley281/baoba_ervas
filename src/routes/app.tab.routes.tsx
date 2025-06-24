import React from 'react';
import { Products } from '../screens/Products';
import { Register } from '../screens/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppStackHomeRoutes } from './app.stackHome.routes';
import { Feather } from '@expo/vector-icons';
import { SignIn } from '../screens/SignIn';
import { Profile } from '../screens/Profile';
import { AppStackProductsRoutes } from './app.stackProducts.routes';
import { AppStackProfileRoutes } from './app.stackProfile.routes';
import { AppStackCartRoutes } from './app.stackCart.routes';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "blue",
        tabBarActiveBackgroundColor: "gray",
        tabBarInactiveTintColor: "lightblue",
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
            <Feather name="home" size={24} color={"blue"} />
          ),
        }}
      />

      <Screen
        name="Produtos"
        component={AppStackProductsRoutes}
        options={{
          tabBarIcon: () => (
            <Feather name="archive" size={24} color={"blue"} />
          ),
        }}
      />

      <Screen
        name="Perfil"
        component={AppStackProfileRoutes}
        options={{
          tabBarIcon: () => (
            <Feather name="user" size={24} color={"blue"} />
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
              color={"blue"}
            />
          ),
        }}
      />
    </Navigator>
  );
}
