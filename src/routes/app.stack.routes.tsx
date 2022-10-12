import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from '../screens/Signin';
import { Products } from '../screens/Products';
import { Register } from '../screens/Register';
import { Dashboard } from '../screens/Dashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductDetail } from '../screens/ProducDetail';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false }}
    >
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="Products" component={Products} />
      <Screen name="Product" component={ProductDetail} />
      <Screen name="Register" component={Register} />
    </Navigator>
  );
}
