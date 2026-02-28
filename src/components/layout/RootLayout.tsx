import React, { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
// Theme
import { spacing } from '@theme/spacing';

export function RootLayout({ children }: PropsWithChildren) {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: spacing.md,
    gap: spacing.lg,
  },
});
