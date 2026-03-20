import React from 'react';
import { render, fireEvent } from '@utils/test-utils';
import { DeleteConfirmationSheet } from '@components/layout/DeleteConfirmationSheet';

describe('DeleteConfirmationSheet', () => {
  const defaultProps = {
    visible: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    entityName: 'Laptop HP',
    entityType: 'producto',
  };

  it('debe mostrar el título con entityType capitalizado', () => {
    const { getByText } = render(<DeleteConfirmationSheet {...defaultProps} />);
    expect(getByText('Eliminar Producto')).toBeTruthy();
  });

  it('debe mostrar el nombre de la entidad en el mensaje', () => {
    const { getByText } = render(<DeleteConfirmationSheet {...defaultProps} />);
    expect(getByText('"Laptop HP"')).toBeTruthy();
  });

  it('debe ejecutar onClose al presionar Cancelar', () => {
    const { getByText } = render(<DeleteConfirmationSheet {...defaultProps} />);
    fireEvent.press(getByText('Cancelar'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('debe ejecutar onConfirm al presionar Eliminar', () => {
    const { getByText } = render(<DeleteConfirmationSheet {...defaultProps} />);
    fireEvent.press(getByText('Eliminar'));
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });
});
