import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Products } from '../screens/Products';
import { Register } from '../screens/Register';
import { Dashboard } from '../screens/Dashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductDetail } from '../screens/ProducDetail';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackProfileRoutes() {
  return (
    <Navigator
      initialRouteName="Register"
      screenOptions={{ headerShown: false }}
    >
      <Screen name="Register" component={Register} />
    </Navigator>
  );
}
