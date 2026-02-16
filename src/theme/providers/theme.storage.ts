import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from '@config/storage'; 
import { getTheme, Theme, ThemeMode } from '..';

interface State {
    theme: Theme;
    setTheme: (mode: ThemeMode) => void;
}

const initialState: State = {
  theme: getTheme('light'),
  setTheme: () => {}
};

export const useThemeStorage = create<State>()(
  persist(
    set => ({
      ...initialState,
      setTheme: (mode) => {
        set({ theme: getTheme(mode) });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
