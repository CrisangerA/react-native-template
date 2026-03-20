import React from 'react';
import { render } from '@utils/test-utils';
import { ItemSeparatorComponent } from '@components/layout/ItemSeparatorComponent';

describe('ItemSeparatorComponent', () => {
  it('debe renderizarse correctamente', () => {
    const { toJSON } = render(<ItemSeparatorComponent />);
    expect(toJSON()).toBeTruthy();
  });
});
