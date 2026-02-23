import { ViewStyle, TextStyle } from 'react-native';
import { Colors, ThemeMode, colors } from '../colors';
import { spacing } from '../spacing';
import { borderRadius, BorderRadiusToken } from '../borders';
import { typography } from '../typography';
import { hScale } from '../responsive';

export type CheckboxVariant = 'primary' | 'error';
export type CheckboxSize = 'sm' | 'md' | 'lg';

interface CheckboxStyleProps {
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  mode?: ThemeMode;
  disabled?: boolean;
  checked?: boolean;
  borderRadius?: BorderRadiusToken;
}

function getSizeStyles(size: CheckboxSize) {
  switch (size) {
    case 'sm':
      return {
        boxSize: hScale(16),
        checkmarkSize: typography.bodySmall?.fontSize ?? 10,
        padding: spacing.xs,
        labelSize: typography.bodySmall?.fontSize ?? 12,
      };
    case 'md':
      return {
        boxSize: hScale(20),
        checkmarkSize: typography.body?.fontSize ?? 14,
        padding: spacing.sm,
        labelSize: typography.body?.fontSize ?? 14,
      };
    case 'lg':
      return {
        boxSize: hScale(24),
        checkmarkSize: 18,
        padding: spacing.md,
        labelSize: 16,
      };
  }
}

function getVariantStyles(
  variant: CheckboxVariant,
  themeColors: Colors,
  disabled: boolean,
  checked: boolean
): { container: ViewStyle; box: ViewStyle; checkmark: TextStyle; label: TextStyle } {
  const opacity = disabled ? 0.5 : 1;
  const activeColor = variant === 'error' ? themeColors.error : themeColors.primary;
  
  // Base box style
  const boxBase: ViewStyle = {
    borderWidth: 2,
    borderColor: checked ? activeColor : themeColors.textSecondary,
    backgroundColor: checked ? activeColor : 'transparent',
    opacity,
  };

  return {
    container: {
      opacity,
    },
    box: boxBase,
    checkmark: {
      color: themeColors.background, // Checkmark usually white or background color
    },
    label: {
      color: variant === 'error' ? themeColors.error : themeColors.text,
    },
  };
}

export function getCheckboxStyle({
  variant = 'primary',
  size = 'md',
  mode = 'light',
  disabled = false,
  checked = false,
  borderRadius: borderRadiusToken = 'sm',
}: CheckboxStyleProps) {
  const themeColors = colors[mode];
  const sizeConfig = getSizeStyles(size);
  const variantStyles = getVariantStyles(variant, themeColors, disabled, checked);

  return {
    container: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      ...variantStyles.container,
    },
    box: {
      width: sizeConfig.boxSize,
      height: sizeConfig.boxSize,
      borderRadius: borderRadius[borderRadiusToken],
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      marginRight: spacing.sm,
      ...variantStyles.box,
    },
    checkmark: {
      fontSize: sizeConfig.checkmarkSize,
      fontWeight: 'bold' as const,
      textAlign: 'center' as const,
      ...variantStyles.checkmark,
    },
    label: {
      fontSize: sizeConfig.labelSize,
      ...variantStyles.label,
    },
  };
}
