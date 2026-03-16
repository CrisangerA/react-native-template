import React, { PropsWithChildren } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
// Theme
import {
  ANIMATION_DURATION,
  SpacingToken,
  useFocusFadeIn,
  useTheme,
} from '@theme/index';
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

  const { animatedStyle: contentStyle } = useFocusFadeIn({
    duration: ANIMATION_DURATION.slow,
    offset: spacing.xl,
  });

  const style = [
    styles.container,
    { backgroundColor, padding: padding && spacing[padding] },
  ];

  if (scroll) {
    return (
      <Animated.ScrollView
        keyboardShouldPersistTaps="handled"
        style={contentStyle}
      >
        {toolbar && <Toolbar onPress={onPress} title={title} />}
        <View style={style}>{children}</View>
      </Animated.ScrollView>
    );
  }

  return (
    <Animated.View style={[style, contentStyle]}>
      {toolbar && <Toolbar onPress={onPress} title={title} />}
      <View style={style}>{children}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
