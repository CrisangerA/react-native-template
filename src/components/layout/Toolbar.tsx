import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
// Components
import { Text } from '@components/core';
// Theme
import { spacing, useTheme } from '@theme/index';

interface Props {
  onPress?: () => void;
  title?: string;
}

export function Toolbar({ onPress, title }: Props) {
  const {
    colors: { surface, border },
  } = useTheme();
  return (
    <View
      style={[
        styles.root,
        { backgroundColor: surface, borderBottomColor: border },
      ]}
    >
      <Pressable onPress={onPress}>
        <Text>🔙</Text>
      </Pressable>
      <Text variant="h4">{title}</Text>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
});
