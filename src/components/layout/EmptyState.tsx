import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
// Components
import { Text, Button } from '@components/core';
// Theme
import { spacing } from '@theme/index';
import { useTheme } from '@theme/index';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: string;
  onAction?: () => void;
  actionLabel?: string;
}

export function EmptyState({
  title = 'No encontrado',
  message = 'No se encontró la información solicitada',
  icon = '📭',
  onAction,
  actionLabel = 'Volver',
}: EmptyStateProps) {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in + Scale animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Bounce animation for icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
    ).start();
  }, [fadeAnim, scaleAnim, bounceAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.iconContainer,
          {
            backgroundColor: theme.colors.textSecondary + '15',
            transform: [{ translateY: bounceAnim }],
          },
        ]}
      >
        <Text variant="h1" style={styles.icon}>
          {icon}
        </Text>
      </Animated.View>

      <Text variant="h3" style={styles.title}>
        {title}
      </Text>

      <Text variant="body" style={styles.message}>
        {message}
      </Text>

      {onAction && (
        <Button onPress={onAction} variant="outlined" style={styles.button}>
          {actionLabel}
        </Button>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  icon: {
    fontSize: 50,
  },
  title: {
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    opacity: 0.7,
    maxWidth: 300,
    marginBottom: spacing.lg,
  },
  button: {
    marginTop: spacing.md,
    minWidth: 150,
  },
});
