import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
// Components
import { Icon, Text } from '@components/core';
// Theme
import { spacing, useTheme } from '@theme/index';

interface Props {
  onBack?: () => void;
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  /**
   * @deprecated Use onBack instead
   */
  onPress?: () => void;
}

export function Toolbar({ onBack, onPress, title, left, right }: Props) {
  const {
    colors: { surface, border, text },
  } = useTheme();

  const handleBack = onBack || onPress;

  const renderLeft = () => {
    if (left) return left;
    if (handleBack) {
      return (
        <Pressable onPress={handleBack} hitSlop={8}>
          <Icon name="arrow-left" size={24} color={text} />
        </Pressable>
      );
    }
    return <View style={styles.placeholder} />;
  };

  const renderRight = () => {
    if (right) return right;
    return <View style={styles.placeholder} />;
  };

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: surface, borderBottomColor: border },
      ]}
    >
      <View style={styles.leftContainer}>{renderLeft()}</View>
      <View style={styles.titleContainer}>
        <Text variant="h4" style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.rightContainer}>{renderRight()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    height: 56,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  placeholder: {
    width: 24,
  },
});
