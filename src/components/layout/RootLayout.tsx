import React, { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
// Theme
import { SpacingToken, useTheme } from '@theme/index';
import { Toolbar } from './Toolbar';

interface Props {
  scroll?: boolean;
  padding?: SpacingToken;
  toolbar?: boolean;
  onPress?: () => void;
  title?: string;
}

export function RootLayout({
  children,
  scroll = true,
  padding,
  toolbar = true,
  onPress,
  title,
}: PropsWithChildren<Props>) {
  const { colors, spacing } = useTheme();
  const { background: backgroundColor } = colors;

  const style = [
    styles.container,
    { backgroundColor, padding: padding && spacing[padding] },
  ];

  if (scroll) {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        {toolbar && <Toolbar onPress={onPress} title={title} />}
        <View style={style}>{children}</View>
      </ScrollView>
    );
  }

  return (
    <View style={style}>
      {toolbar && <Toolbar onPress={onPress} title={title} />}
      <View style={style}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
