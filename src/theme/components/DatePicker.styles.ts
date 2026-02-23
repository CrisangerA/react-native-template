import { TextStyle, ViewStyle } from 'react-native';
import { ThemeMode, colors } from '../colors';
import { spacing } from '../spacing';

export type DatePickerMode = 'date' | 'time' | 'datetime';
export type DatePickerVariant = 'default' | 'outlined' | 'filled';

interface DatePickerStyleProps {
  mode?: ThemeMode;
}

export interface DatePickerStyles {
  placeholder: TextStyle;
  iconButton: ViewStyle;
  icon: TextStyle;
  pickerContainer: ViewStyle;
  pickerHeader: ViewStyle;
  pickerButton: ViewStyle;
  pickerButtonText: TextStyle;
  picker: ViewStyle;
  pickerTime: ViewStyle;
}

export function getDatePickerStyle({
  mode = 'light',
}: DatePickerStyleProps): DatePickerStyles {
  return {
    placeholder: {
      color: colors[mode].textSecondary,
    },
    iconButton: {
      padding: spacing.xs,
    },
    icon: {
      fontSize: 20,
    },
    pickerContainer: {
      marginTop: spacing.sm,
      borderRadius: 12,
      overflow: 'hidden' as const,
    },
    pickerHeader: {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      padding: spacing.md,
      backgroundColor: '#f5f5f5',
    },
    pickerButton: {
      padding: spacing.sm,
    },
    pickerButtonText: {
      fontWeight: '600' as const,
    },
    picker: {
      height: 150,
    },
    pickerTime: {
      height: 120,
    },
  };
}

export function getIconColor(mode: ThemeMode): string {
  return colors[mode].textSecondary;
}

export function getIconPressedColor(mode: ThemeMode): string {
  return colors[mode].primary;
}

export function getPickerTextColor(mode: ThemeMode): string {
  return colors[mode].text;
}

export function getPickerBackgroundColor(mode: ThemeMode): string {
  return colors[mode].surface;
}
