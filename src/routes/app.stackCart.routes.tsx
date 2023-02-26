import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Cart } from '../screens/Cart';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackCartRoutes() {
  return (
    <Navigator initialRouteName="Cart" screenOptions={{ headerShown: false }}>
      <Screen name="Cart" component={Cart} />
    </Navigator>
  );
}
