import { ViewStyle } from 'react-native';
import { ThemeMode, colors, ColorVariant } from '../colors';

export type IconSize = number;
export type IconColor = ColorVariant | string;

interface IconStyleProps {
  size?: IconSize;
  color?: IconColor;
  strokeWidth?: number;
  mode?: ThemeMode; // ⚠️ OBLIGATORIO
}

export function getIconStyle(props: IconStyleProps): {
  container: ViewStyle;
  svg: {
    width: number;
    height: number;
    color: string;
    strokeWidth: number;
  };
} {
  const { mode = 'light', size = 20, color, strokeWidth = 1.8 } = props;
  const themeColors = colors[mode];

  // Resolve color if it's a theme color reference
  let resolvedColor = themeColors.text; // Default
  if (color) {
    if (typeof color === 'string' && color.includes('#')) {
      // Hex color
      resolvedColor = color;
    } else if (themeColors[color as ColorVariant]) {
      // Theme color reference
      resolvedColor = themeColors[color as ColorVariant];
    } else {
      // Fallback to text color
      resolvedColor = themeColors.text;
    }
  }

  return {
    container: {
      // Container styling if needed for layout
    },
    svg: {
      width: size,
      height: size,
      color: resolvedColor,
      strokeWidth: strokeWidth,
    },
  };
}
