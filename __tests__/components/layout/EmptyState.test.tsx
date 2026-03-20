import React from 'react';
import { render, fireEvent } from '@utils/test-utils';
import { EmptyState } from '@components/layout/EmptyState';
import { Text as RNText } from 'react-native';

jest.mock('@theme/hooks', () => ({
  useAnimatedLoop: jest.fn(() => ({
    value: { interpolate: jest.fn(() => 0) },
    interpolated: 0,
  })),
  useFadeScale: jest.fn(() => ({
    opacity: { interpolate: jest.fn() },
    scale: { interpolate: jest.fn() },
  })),
  useFadeSlide: jest.fn(),
  useFocusFadeIn: jest.fn(),
  useFocusSlideIn: jest.fn(),
}));

describe('EmptyState', () => {
  it('debe mostrar título y mensaje por defecto', () => {
    const { getByText } = render(<EmptyState />);
    expect(getByText('No encontrado')).toBeTruthy();
    expect(getByText('No se encontró la información solicitada')).toBeTruthy();
  });

  it('debe mostrar título y mensaje personalizados', () => {
    const { getByText } = render(
      <EmptyState title="Sin productos" message="Agrega un producto" />,
    );
    expect(getByText('Sin productos')).toBeTruthy();
    expect(getByText('Agrega un producto')).toBeTruthy();
  });

  it('debe mostrar botón de acción cuando se provee onAction', () => {
    const onAction = jest.fn();
    const { getByText } = render(
      <EmptyState onAction={onAction} actionLabel="Crear nuevo" />,
    );
    const button = getByText('Crear nuevo');
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('no debe mostrar botón cuando no se provee onAction', () => {
    const { queryByText } = render(<EmptyState />);
    expect(queryByText('Volver')).toBeNull();
  });

  it('debe renderizar ícono personalizado cuando se provee', () => {
    const { getByText } = render(
      <EmptyState icon={<RNText>Custom Icon</RNText>} />,
    );
    expect(getByText('Custom Icon')).toBeTruthy();
  });
});
