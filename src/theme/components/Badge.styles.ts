import { ViewStyle, TextStyle } from 'react-native';
import { Colors, ThemeMode, colors } from '../colors';
import { spacing } from '../spacing';
import { borderRadius } from '../borders';

export type BadgeVariant = 'admin' | 'editor' | 'viewer' | 'default';

interface BadgeStyleProps {
  variant?: BadgeVariant;
  mode?: ThemeMode;
}

function getVariantStyles(
  variant: BadgeVariant,
  themeColors: Colors,
): { container: ViewStyle; text: TextStyle } {
  switch (variant) {
    case 'admin':
      return {
        container: {
          backgroundColor: themeColors.primary,
        },
        text: {
          color: '#FFFFFF',
        },
      };

    case 'editor':
      return {
        container: {
          backgroundColor: themeColors.success,
        },
        text: {
          color: '#FFFFFF',
        },
      };

    case 'viewer':
      return {
        container: {
          backgroundColor: themeColors.border,
        },
        text: {
          color: themeColors.text,
        },
      };

    case 'default':
      return {
        container: {
          backgroundColor: themeColors.surface,
          borderWidth: 1,
          borderColor: themeColors.border,
        },
        text: {
          color: themeColors.textSecondary,
        },
      };
  }
}

export function getBadgeStyle({
  variant = 'default',
  mode = 'light',
}: BadgeStyleProps): { container: ViewStyle; text: TextStyle } {
  const themeColors = colors[mode];
  const variantStyles = getVariantStyles(variant, themeColors);

  return {
    container: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs / 2,
      borderRadius: borderRadius.sm,
      alignSelf: 'flex-start',
      ...variantStyles.container,
    },
    text: {
      fontSize: 10,
      fontWeight: 'bold',
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      ...variantStyles.text,
    },
  };
}
