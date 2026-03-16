import React from 'react';
import { StyleSheet, View } from 'react-native';
// Components
import { Text } from '@components/core';
import { RootLayout } from '@components/layout';
import SignUpForm from './components/signup/SignUpForm';
// Theme
import { spacing } from '@theme/index';

export default function UserSignInView() {
  return (
    <RootLayout>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="h1">Registro de Usuario</Text>
          <Text variant="body" color="textSecondary">
            Complete el formulario para crear su cuenta
          </Text>
        </View>

        <SignUpForm />
      </View>
    </RootLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
});
