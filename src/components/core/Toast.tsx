import React, { useEffect, useRef } from 'react';
import { Animated, Text as RNText, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, spacing } from '@theme/index';
import { getToastStyle } from '@theme/components/Toast.styles';

import type {
  ToastType,
  ToastPosition,
} from '@modules/core/infrastructure/app.storage';

interface ToastProps {
  message: string;
  type: ToastType;
  visible: boolean;
  onHide: () => void;
  duration: number;
  position: ToastPosition;
}

const SLIDE_OFFSET = 20;

export function Toast({
  message,
  type,
  visible,
  onHide,
  duration,
  position,
}: ToastProps) {
  const { top, bottom } = useSafeAreaInsets();
  const { mode } = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const styles = getToastStyle({ type, mode });
  const isTop = position === 'top';
  const slideStart = isTop ? -SLIDE_OFFSET : SLIDE_OFFSET;

  useEffect(() => {
    if (visible) {
      translateY.setValue(slideStart);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      timerRef.current = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: slideStart,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => onHide());
      }, duration);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, duration, onHide, opacity, translateY, slideStart]);

  if (!visible) return null;

  const positionStyle = isTop
    ? { top: top + spacing.md }
    : { bottom: bottom + spacing.md };

  return (
    <Animated.View
      style={[
        fixedStyles.wrapper,
        positionStyle,
        styles.container,
        { opacity, transform: [{ translateY }] },
      ]}
    >
      <RNText style={fixedStyles.icon}>{styles.icon}</RNText>
      <RNText style={styles.text}>{message}</RNText>
    </Animated.View>
  );
}

const fixedStyles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: spacing.base,
    right: spacing.base,
    zIndex: 9999,
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
