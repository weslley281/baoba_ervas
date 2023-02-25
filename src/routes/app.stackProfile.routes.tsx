import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile } from '../screens/Profile';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackProfileRoutes() {
  return (
    <Navigator
      initialRouteName="Register"
      screenOptions={{ headerShown: false }}
    >
      <Screen name="Register" component={Profile} />
    </Navigator>
  );
}
