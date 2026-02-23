import React, { PropsWithChildren } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
// Providers
import SecureProvider from './SecureProvider';
import ThemeProvider from '@theme/providers/ThemeProvider';
// Styles
import { useTheme, commonStyles } from '@theme/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <SecureProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SafeAreaProvider>
            <GestureHandlerProvider>{children}</GestureHandlerProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SecureProvider>
  );
}

function GestureHandlerProvider({ children }: PropsWithChildren) {
  const {
    colors: { background: backgroundColor },
  } = useTheme();

  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView
      style={{
        ...commonStyles.flex,
        backgroundColor,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {children}
    </GestureHandlerRootView>
  );
}
