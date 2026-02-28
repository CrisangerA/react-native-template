import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
// Components
import { Text, Button } from '@components/core';
// Theme
import { spacing } from '@theme/index';
import { useTheme } from '@theme/index';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = 'Error',
  message = 'Ha ocurrido un error',
  onRetry,
  retryLabel = 'Reintentar',
}: ErrorStateProps) {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Fade in + Scale animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Shake animation
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, shakeAnim, scaleAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateX: shakeAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: theme.colors.error + '20' },
        ]}
      >
        <Text variant="h1" style={[styles.icon, { color: theme.colors.error }]}>
          ⚠️
        </Text>
      </View>

      <Text variant="h3" style={[styles.title, { color: theme.colors.error }]}>
        {title}
      </Text>

      <Text variant="body" style={styles.message}>
        {message}
      </Text>

      {onRetry && (
        <Button onPress={onRetry} style={styles.button}>
          {retryLabel}
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
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    marginBottom: spacing.md,
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
