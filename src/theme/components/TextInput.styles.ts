import { ViewStyle, TextStyle } from 'react-native';
import { Colors, ThemeMode, colors } from '../colors';
import { spacing } from '../spacing';
import { borderRadius, BorderRadiusToken } from '../borders';
import { typography } from '../typography';
import { hScale } from '../responsive';

export type TextInputVariant = 'default' | 'outlined' | 'filled';
export type TextInputSize = 'md' | 'lg';
export type TextInputState = 'default' | 'focus' | 'error' | 'disabled';

interface TextInputStyleProps {
  variant?: TextInputVariant;
  size?: TextInputSize;
  mode?: ThemeMode;
  state?: TextInputState;
  fullWidth?: boolean;
  borderRadius?: BorderRadiusToken;
  hasIconLeft?: boolean;
  hasIconRight?: boolean;
}

function getSizeStyles(size: TextInputSize) {
  switch (size) {
    case 'md':
      return {
        height: hScale(48),
        paddingHorizontal: spacing.md,
        fontSize: typography.body.fontSize ?? 16,
      };
    case 'lg':
      return {
        height: hScale(56),
        paddingHorizontal: spacing.lg,
        fontSize: typography.body.fontSize ?? 16,
      };
  }
}

function getVariantStyles(
  variant: TextInputVariant,
  themeColors: Colors,
  state: TextInputState,
): { container: ViewStyle; input: TextStyle } {
  const baseBorderColor = themeColors.border;
  const focusBorderColor = themeColors.primary;
  const errorBorderColor = themeColors.error;
  const disabledBackground = themeColors.surface;
  const disabledTextColor = themeColors.textSecondary;

  let borderColor = baseBorderColor;
  let textColor = themeColors.text;

  if (state === 'focus') {
    borderColor = focusBorderColor;
  } else if (state === 'error') {
    borderColor = errorBorderColor;
  } else if (state === 'disabled') {
    textColor = disabledTextColor;
  }

  switch (variant) {
    case 'outlined':
      return {
        container: {
          backgroundColor:
            state === 'disabled' ? disabledBackground : 'transparent',
          borderWidth: 1.5,
          borderColor,
        },
        input: {
          color: textColor,
        },
      };

    case 'filled':
      return {
        container: {
          backgroundColor:
            state === 'disabled' ? disabledBackground : themeColors.surface,
          borderWidth: 0,
          borderBottomWidth: state === 'focus' ? 2 : 1,
          borderColor,
          borderRadius: 0,
        },
        input: {
          color: textColor,
        },
      };

    case 'default':
    default:
      return {
        container: {
          backgroundColor:
            state === 'disabled' ? disabledBackground : 'transparent',
          borderWidth: 1,
          borderColor,
        },
        input: {
          color: textColor,
        },
      };
  }
}

export function getTextInputStyle({
  variant = 'default',
  size = 'md',
  mode = 'light',
  state = 'default',
  fullWidth = false,
  borderRadius: borderRadiusToken = 'md',
  hasIconLeft = false,
  hasIconRight = false,
}: TextInputStyleProps): { container: ViewStyle; input: TextStyle } {
  const themeColors = colors[mode];
  const sizeConfig = getSizeStyles(size);
  const variantStyles = getVariantStyles(variant, themeColors, state);

  return {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: fullWidth ? '100%' : 'auto',
      height: sizeConfig.height,
      paddingHorizontal: sizeConfig.paddingHorizontal,
      borderRadius: borderRadius[borderRadiusToken],
      ...(variant === 'filled' && { borderRadius: 0 }),
      ...variantStyles.container,
    },
    input: {
      flex: 1,
      fontSize: sizeConfig.fontSize,
      fontFamily: typography.body.fontFamily,
      fontWeight: typography.body.fontWeight,
      paddingLeft: hasIconLeft ? spacing.sm : 0,
      paddingRight: hasIconRight ? spacing.lg : 0,
      ...variantStyles.input,
    },
  };
}

export function getLabelStyle(
  mode: ThemeMode,
  state: TextInputState,
): TextStyle {
  const themeColors = colors[mode];

  if (state === 'error') {
    return {
      color: themeColors.error,
      fontSize: typography.bodySmall.fontSize,
      fontWeight: '500',
      marginBottom: spacing.xs,
    };
  }

  if (state === 'focus') {
    return {
      color: themeColors.primary,
      fontSize: typography.bodySmall.fontSize,
      fontWeight: '500',
      marginBottom: spacing.xs,
    };
  }

  return {
    color: themeColors.textSecondary,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: '400',
    marginBottom: spacing.xs,
  };
}

export function getErrorStyle(mode: ThemeMode): TextStyle {
  const themeColors = colors[mode];

  return {
    color: themeColors.error,
    fontSize: typography.caption.fontSize,
    marginTop: spacing.xs,
  };
}

export function getHelperTextStyle(mode: ThemeMode): TextStyle {
  const themeColors = colors[mode];

  return {
    color: themeColors.textSecondary,
    fontSize: typography.caption.fontSize,
    marginTop: spacing.xs,
  };
}
