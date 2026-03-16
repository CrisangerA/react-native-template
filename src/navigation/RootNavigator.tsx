import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Stacks
import ProductsNavigator from './stacks/ProductsStackNavigator';
import ExamplesNavigator from './stacks/ExampleStackNavigator';
import UsersNavigator from './stacks/UsersStackNavigator';
import AuthenticationNavigator from './stacks/AuthenticationStackNavigator';
// Routes
import { RootRoutes, type RootStackParamList } from './routes/root.routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 2500,
      }}
    >
      <Stack.Screen name={RootRoutes.Examples} component={ExamplesNavigator} />
      <Stack.Screen name={RootRoutes.Products} component={ProductsNavigator} />
      <Stack.Screen name={RootRoutes.Users} component={UsersNavigator} />
      <Stack.Screen
        name={RootRoutes.Authentication}
        component={AuthenticationNavigator}
      />
    </Stack.Navigator>
  );
}
