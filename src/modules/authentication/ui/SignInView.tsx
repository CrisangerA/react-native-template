import React from 'react';
import { StyleSheet, View } from 'react-native';
// Components
import { Text } from '@components/core';
import { RootLayout } from '@components/layout';
import SignInForm from './components/signin/SignInForm';
// Theme
import { spacing } from '@theme/index';

interface SignInViewProps {
  onBack?: () => void;
}

/**
 * Vista principal de inicio de sesión de usuario
 */
export default function SignInView({ onBack }: SignInViewProps) {
  return (
    <RootLayout onBack={onBack}>
      <View style={styles.header}>
        <Text variant="h1">Inicio de sesión</Text>
        <Text variant="body" color="textSecondary">
          Ingrese sus credenciales para acceder a su cuenta
        </Text>
      </View>

      <SignInForm />
    </RootLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
});

