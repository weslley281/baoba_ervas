import React from 'react';
import { SignIn } from '../screens/SignIn';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Register } from '../screens/Register';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SignIn"
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="Register" component={Register} />
    </Navigator>
  );
}
