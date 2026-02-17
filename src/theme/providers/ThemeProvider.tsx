import { createContext, PropsWithChildren } from 'react';
import { getTheme, Theme } from '../index';
import { useThemeStorage } from './theme.storage';

const ThemeContext = createContext<Theme>(getTheme('light'));
ThemeContext.displayName = 'ThemeContext';

export default function ThemeProvider({ children }: PropsWithChildren) {
  const { theme, setTheme } = useThemeStorage();

  return (
    <ThemeContext.Provider
      value={{
        ...theme,
        toggleTheme: setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
