import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
// Components
import { Text } from '@components/core';
import { RootLayout } from '@components/layout';
import SignUpForm from './components/signup/SignUpForm';
// Theme
import { useFocusFadeIn } from '@theme/hooks';
import { ANIMATION_DURATION, spacing } from '@theme/index';

export default function UserSignInView() {
  const { animatedStyle } = useFocusFadeIn({
    offset: 20,
    duration: ANIMATION_DURATION.slow,
  });

  return (
    <RootLayout>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.header}>
          <Text variant="h1">Registro de Usuario</Text>
          <Text variant="body" color="textSecondary">
            Complete el formulario para crear su cuenta
          </Text>
        </View>

        <SignUpForm />
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
