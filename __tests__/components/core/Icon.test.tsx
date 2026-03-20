import React from 'react';
import { render } from '@utils/test-utils';
import { Icon } from '@components/core/Icon';

describe('Icon Component', () => {
  it('debe renderizarse correctamente con un nombre', () => {
    const { toJSON } = render(<Icon name="sun" />);
    expect(toJSON()).toBeTruthy();
  });

  it('debe renderizarse con diferentes nombres de ícono', () => {
    const { toJSON: json1 } = render(<Icon name="moon" />);
    const { toJSON: json2 } = render(<Icon name="search" />);
    expect(json1()).toBeTruthy();
    expect(json2()).toBeTruthy();
  });

  it('debe aceptar prop de tamaño personalizado', () => {
    const { toJSON } = render(<Icon name="check" size={30} />);
    expect(toJSON()).toBeTruthy();
  });

  it('debe aceptar prop de color semántico', () => {
    const { toJSON } = render(<Icon name="warning" color="error" />);
    expect(toJSON()).toBeTruthy();
  });

  it('debe aceptar strokeWidth personalizado', () => {
    const { toJSON } = render(<Icon name="star" strokeWidth={2.5} />);
    expect(toJSON()).toBeTruthy();
  });
});
