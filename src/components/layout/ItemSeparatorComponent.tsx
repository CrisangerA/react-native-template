import { StyleSheet, View } from 'react-native';
import React from 'react';
import { spacing } from '@theme/spacing';

export function ItemSeparatorComponent() {
  return <View style={styles.root} />;
}

const styles = StyleSheet.create({
  root: {
    height: spacing.md,
  },
});
