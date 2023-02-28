import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Cart } from '../screens/Cart';
import { Checkout } from '../screens/checkout';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackCartRoutes() {
  return (
    <Navigator initialRouteName="Cart" screenOptions={{ headerShown: false }}>
      <Screen name="Cart" component={Cart} />
      <Screen name="Checkout" component={Checkout} />
    </Navigator>
  );
}
