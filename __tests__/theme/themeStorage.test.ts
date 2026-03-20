import { useThemeStorage } from '@theme/providers/theme.storage';
import { act } from '@testing-library/react-native';

describe('useThemeStorage', () => {
  it('debe iniciar con tema light', () => {
    const { theme } = useThemeStorage.getState();
    expect(theme.mode).toBe('light');
    expect(theme.isDark).toBe(false);
  });

  it('debe cambiar a modo dark con setTheme', () => {
    act(() => {
      useThemeStorage.getState().setTheme('dark');
    });

    const { theme } = useThemeStorage.getState();
    expect(theme.mode).toBe('dark');
    expect(theme.isDark).toBe(true);
  });

  it('debe volver a modo light con setTheme', () => {
    act(() => {
      useThemeStorage.getState().setTheme('dark');
    });
    act(() => {
      useThemeStorage.getState().setTheme('light');
    });

    const { theme } = useThemeStorage.getState();
    expect(theme.mode).toBe('light');
    expect(theme.isDark).toBe(false);
  });
});
