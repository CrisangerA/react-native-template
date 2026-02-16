import { useContext } from 'react';
import { ThemeContext } from '@theme/providers/ThemeProvider';

export function useTheme() {
  return useContext(ThemeContext);
}
