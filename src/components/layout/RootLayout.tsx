import React, { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
// Theme
import { SpacingToken, useTheme } from '@theme/index';

interface Props {
  scroll?: boolean;
  padding?: SpacingToken;
}

export function RootLayout({
  children,
  scroll = true,
  padding,
}: PropsWithChildren<Props>) {
  const { colors, spacing } = useTheme();
  const { background: backgroundColor } = colors;

  const style = [
    styles.contentContainer,
    { backgroundColor, padding: padding && spacing[padding] },
  ];

  if (scroll) {
    return <ScrollView contentContainerStyle={style}>{children}</ScrollView>;
  }

  return <View style={style}>{children}</View>;
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
