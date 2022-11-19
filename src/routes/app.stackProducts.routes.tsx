import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Products } from '../screens/Products';
import { Register } from '../screens/Register';
import { Dashboard } from '../screens/Dashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductDetail } from '../screens/ProducDetail';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackProductsRoutes() {
  return (
    <Navigator
      initialRouteName="Products"
      screenOptions={{ headerShown: false }}
    >
      <Screen name="Products" component={Products} />
      <Screen name="Product" component={ProductDetail} />
    </Navigator>
  );
}
