import React from 'react';
import { View } from 'react-native';
// Components
import { Text } from './Text';
// Theme
import { useTheme } from '@theme/index';
import { BadgeVariant, getBadgeStyle } from '@theme/components/Badge.styles';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const theme = useTheme();
  const styles = getBadgeStyle({ variant, mode: theme.mode });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}
