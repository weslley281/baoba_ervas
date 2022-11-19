import React from 'react';
import { Register } from '../screens/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
