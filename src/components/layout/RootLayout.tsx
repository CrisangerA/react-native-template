import React, { PropsWithChildren } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
// Components
import { Button } from '@components/core';
// Theme
import { spacing } from '@theme/spacing';

interface RootLayoutProps {
  onBack?: () => void;
}

export function RootLayout({
  children,
  onBack,
}: PropsWithChildren<RootLayoutProps>) {
  return (
    <View>
      {onBack && (
        <Button variant="ghost" size="sm" onPress={onBack}>
          ← Volver
        </Button>
      )}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: spacing.md,
    gap: spacing.lg,
  },
});
