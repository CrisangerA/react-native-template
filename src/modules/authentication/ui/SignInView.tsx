import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
// Components
import { Text } from '@components/core';
import { RootLayout } from '@components/layout';
import SignInForm from './components/signin/SignInForm';
// Theme
import { useFocusFadeIn } from '@theme/hooks';
import { ANIMATION_DURATION, spacing } from '@theme/index';

/**
 * Vista principal de inicio de sesion de usuario
 */
export default function SignInView() {
  const { animatedStyle } = useFocusFadeIn({
    offset: 20,
    duration: ANIMATION_DURATION.slow,
  });

  return (
    <RootLayout>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.header}>
          <Text variant="h1">Inicio de sesion</Text>
          <Text variant="body" color="textSecondary">
            Ingrese sus credenciales para acceder a su cuenta
          </Text>
        </View>

        <SignInForm />
      </Animated.View>
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
