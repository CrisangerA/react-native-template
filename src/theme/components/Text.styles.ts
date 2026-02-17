import { TextStyle } from 'react-native';
import { typography, TypographyVariant } from '../typography';
import { ColorVariant, ThemeMode, colors } from '../colors';

interface TextStyleProps {
  variant?: TypographyVariant;
  mode?: ThemeMode;
  color?: ColorVariant;
  align?: TextStyle['textAlign'];
  transform?: TextStyle['textTransform'];
  decoration?: TextStyle['textDecorationLine'];
}

export function getTextStyle({
  variant = 'body',
  mode = 'light',
  color = 'text',
  align,
  transform,
  decoration,
}: TextStyleProps) {
  return {
    color: colors[mode][color],
    ...typography[variant],
    ...(align && { textAlign: align }),
    ...(transform && { textTransform: transform }),
    ...(decoration && { textDecorationLine: decoration }),
  } as TextStyle;
}
