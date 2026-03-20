import React from 'react';
import { render, fireEvent } from '@utils/test-utils';
import { ErrorState } from '@components/layout/ErrorState';

jest.mock('@theme/hooks', () => ({
  useAnimatedLoop: jest.fn(),
  useFadeScale: jest.fn(() => ({
    opacity: { interpolate: jest.fn() },
    scale: { interpolate: jest.fn() },
  })),
  useFadeSlide: jest.fn(),
  useFocusFadeIn: jest.fn(),
  useFocusSlideIn: jest.fn(),
}));

describe('ErrorState', () => {
  it('debe mostrar título y mensaje por defecto', () => {
    const { getByText } = render(<ErrorState />);
    expect(getByText('Error')).toBeTruthy();
    expect(getByText('Ha ocurrido un error')).toBeTruthy();
  });

  it('debe mostrar título y mensaje personalizados', () => {
    const { getByText } = render(
      <ErrorState title="Sin conexión" message="Verifica tu internet" />,
    );
    expect(getByText('Sin conexión')).toBeTruthy();
    expect(getByText('Verifica tu internet')).toBeTruthy();
  });

  it('debe mostrar botón de reintentar y ejecutar callback', () => {
    const onRetry = jest.fn();
    const { getByText } = render(<ErrorState onRetry={onRetry} />);
    const button = getByText('Reintentar');
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('no debe mostrar botón cuando no se provee onRetry', () => {
    const { queryByText } = render(<ErrorState />);
    expect(queryByText('Reintentar')).toBeNull();
  });

  it('debe mostrar etiqueta personalizada en botón de reintentar', () => {
    const onRetry = jest.fn();
    const { getByText } = render(
      <ErrorState onRetry={onRetry} retryLabel="Intentar de nuevo" />,
    );
    expect(getByText('Intentar de nuevo')).toBeTruthy();
  });
});
