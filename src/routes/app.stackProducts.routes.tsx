import React from 'react';
import { Products } from '../screens/Products';
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
