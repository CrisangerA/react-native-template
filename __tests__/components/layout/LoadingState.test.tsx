import React from 'react';
import { render } from '@utils/test-utils';
import { LoadingState } from '@components/layout/LoadingState';

jest.mock('@theme/hooks', () => ({
  useAnimatedLoop: jest.fn(() => ({
    value: { interpolate: jest.fn(() => '0deg') },
    interpolated: '0deg',
  })),
  useFadeScale: jest.fn(),
  useFadeSlide: jest.fn(),
  useFocusFadeIn: jest.fn(),
  useFocusSlideIn: jest.fn(),
}));

describe('LoadingState', () => {
  it('debe mostrar el mensaje por defecto "Cargando..."', () => {
    const { getByText } = render(<LoadingState />);
    expect(getByText('Cargando...')).toBeTruthy();
  });

  it('debe mostrar un mensaje personalizado', () => {
    const { getByText } = render(<LoadingState message="Procesando datos..." />);
    expect(getByText('Procesando datos...')).toBeTruthy();
  });

  it('no debe mostrar el mensaje por defecto cuando se personaliza', () => {
    const { queryByText } = render(<LoadingState message="Otro mensaje" />);
    expect(queryByText('Cargando...')).toBeNull();
    expect(queryByText('Otro mensaje')).toBeTruthy();
  });
});
