import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ExamplesNavigator } from '@modules/examples/ui/navigation';

import type { RootStackParamList } from './root.navigator.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Examples" component={ExamplesNavigator} />
    </Stack.Navigator>
  );
}
