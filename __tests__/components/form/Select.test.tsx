import React from 'react';
import { render, fireEvent, waitFor } from '@utils/test-utils';
import { Select } from '@components/form/Select';
import { useForm } from 'react-hook-form';
import { View, Pressable, Text } from 'react-native';

interface TestForm {
  role: { label: string; value: string } | null;
}

const options = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];

function TestWrapper({
  defaultValues = { role: null },
  onSubmit = jest.fn(),
}: {
  defaultValues?: TestForm;
  onSubmit?: (data: TestForm) => void;
}) {
  const { control, handleSubmit } = useForm<TestForm>({ defaultValues });
  return (
    <View>
      <Select
        control={control}
        name="role"
        label="Rol"
        options={options}
        placeholder="Seleccionar rol"
      />
      <Pressable onPress={handleSubmit(onSubmit)}>
        <Text>Enviar</Text>
      </Pressable>
    </View>
  );
}

describe('Form Select', () => {
  it('debe renderizar con label y placeholder', () => {
    const { getByText } = render(<TestWrapper />);
    expect(getByText('Rol')).toBeTruthy();
  });

  it('debe mostrar valor por defecto seleccionado', () => {
    const { getByDisplayValue } = render(
      <TestWrapper defaultValues={{ role: { label: 'Admin', value: 'admin' } }} />,
    );
    expect(getByDisplayValue('Admin')).toBeTruthy();
  });

  it('debe abrir opciones y seleccionar un valor', async () => {
    const onSubmit = jest.fn();
    const { getByText } = render(<TestWrapper onSubmit={onSubmit} />);

    // Abrir el select presionando el placeholder
    fireEvent.press(getByText('Rol'));

    // Seleccionar opción
    fireEvent.press(getByText('Editor'));

    // Enviar
    fireEvent.press(getByText('Enviar'));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ role: { label: 'Editor', value: 'editor' } }),
        undefined,
      );
    });
  });
});
