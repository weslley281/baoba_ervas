import React from 'react';
import { Dashboard } from '../screens/Dashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
