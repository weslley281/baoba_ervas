import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Products } from '../screens/Products';
import { Register } from '../screens/Register';
import { Dashboard } from '../screens/Dashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductDetail } from '../screens/ProducDetail';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackHomeRoutes() {
  return (
    <Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false }}
    >
      <Screen name="Dashboard" component={Dashboard} />
    </Navigator>
  );
}
