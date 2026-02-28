import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTheme } from '@theme/index';

import LandingView from '../LandingView';
import TextsView from '../TextsView';
import ButtonsView from '../ButtonsView';
import TextInputsView from '../TextInputsView';
import CardsView from '../CardsView';
import CheckboxesView from '../CheckboxesView';
import ModalsView from '../ModalsView';
import SignInView from '@modules/authentication/ui/SignInView';

import type { ExamplesStackParamList } from './examples.navigator.types';

const Stack = createNativeStackNavigator<ExamplesStackParamList>();

export default function ExamplesNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.primary,
        headerTitleStyle: { color: colors.text },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="Landing"
        component={LandingView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Texts"
        component={TextsView}
        options={{ title: 'Componente Text' }}
      />
      <Stack.Screen
        name="Buttons"
        component={ButtonsView}
        options={{ title: 'Componente Button' }}
      />
      <Stack.Screen
        name="TextInputs"
        component={TextInputsView}
        options={{ title: 'Componente TextInput' }}
      />
      <Stack.Screen
        name="Cards"
        component={CardsView}
        options={{ title: 'Componente Card' }}
      />
      <Stack.Screen
        name="Checkboxes"
        component={CheckboxesView}
        options={{ title: 'Componente Checkbox' }}
      />
      <Stack.Screen
        name="Modals"
        component={ModalsView}
        options={{ title: 'Componente Modal' }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInView}
        options={{ title: 'Inicio de Sesion' }}
      />
    </Stack.Navigator>
  );
}
