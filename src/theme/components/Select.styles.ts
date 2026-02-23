import { ViewStyle, TextStyle } from 'react-native';
import { ThemeMode, colors } from '../colors';
import { spacing } from '../spacing';
import { borderRadius, BorderRadiusToken } from '../borders';
import { hScale } from '../responsive';

export type SelectSize = 'sm' | 'md' | 'lg';

interface SelectStyleProps {
  size?: SelectSize;
  mode?: ThemeMode;
  borderRadius?: BorderRadiusToken;
  isOpen?: boolean;
  isDisabled?: boolean;
}

function getSizeStyles(size: SelectSize) {
  switch (size) {
    case 'sm':
      return {
        height: hScale(36),
        paddingHorizontal: spacing.sm,
      };
    case 'md':
      return {
        height: hScale(48),
        paddingHorizontal: spacing.md,
      };
    case 'lg':
      return {
        height: hScale(56),
        paddingHorizontal: spacing.lg,
      };
  }
}

export function getSelectStyle({
  size = 'md',
  mode = 'light',
  borderRadius: borderRadiusToken = 'md',
  isOpen = false,
  isDisabled = false,
}: SelectStyleProps): {
  container: ViewStyle;
  input: TextStyle;
  icon: TextStyle;
} {
  const themeColors = colors[mode];
  const sizeConfig = getSizeStyles(size);

  return {
    container: {
      height: sizeConfig.height,
      paddingHorizontal: sizeConfig.paddingHorizontal,
      borderRadius: borderRadius[borderRadiusToken],
      backgroundColor: themeColors.surface,
      borderWidth: 1,
      borderColor: isOpen ? themeColors.primary : themeColors.border,
      opacity: isDisabled ? 0.5 : 1,
    },
    input: {
      flex: 1,
      color: themeColors.text,
      fontSize: 16,
    },
    icon: {
      fontSize: 16,
      color: isOpen ? themeColors.primary : themeColors.textSecondary,
    },
  };
}

export function getSelectOptionStyle(
  mode: ThemeMode,
  isSelected: boolean,
): ViewStyle {
  const themeColors = colors[mode];

  return {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: isSelected ? themeColors.primary + '15' : 'transparent',
  };
}
