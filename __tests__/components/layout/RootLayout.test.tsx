import React from 'react';
import { Text as RNText } from 'react-native';
import { render } from '@utils/test-utils';
import { RootLayout } from '@components/layout/RootLayout';

jest.mock('@theme/hooks', () => ({
  useAnimatedLoop: jest.fn(),
  useFadeScale: jest.fn(),
  useFadeSlide: jest.fn(),
  useFocusFadeIn: jest.fn(() => ({
    animatedStyle: {},
  })),
  useFocusSlideIn: jest.fn(),
}));

describe('RootLayout', () => {
  it('debe renderizar children correctamente', () => {
    const { getByText } = render(
      <RootLayout toolbar={false}>
        <RNText>Contenido</RNText>
      </RootLayout>,
    );
    expect(getByText('Contenido')).toBeTruthy();
  });

  it('debe renderizar con scroll por defecto', () => {
    const { getByText } = render(
      <RootLayout toolbar={false}>
        <RNText>Con scroll</RNText>
      </RootLayout>,
    );
    expect(getByText('Con scroll')).toBeTruthy();
  });

  it('debe renderizar sin scroll cuando scroll=false', () => {
    const { getByText } = render(
      <RootLayout scroll={false} toolbar={false}>
        <RNText>Sin scroll</RNText>
      </RootLayout>,
    );
    expect(getByText('Sin scroll')).toBeTruthy();
  });

  it('debe renderizar toolbar cuando toolbar=true', () => {
    const { toJSON } = render(
      <RootLayout toolbar={true} title="Mi Pantalla">
        <RNText>Con toolbar</RNText>
      </RootLayout>,
    );
    expect(toJSON()).toBeTruthy();
  });
});
