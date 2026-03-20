import React from 'react';
import { render, fireEvent, waitFor } from '@utils/test-utils';
import { TextInput } from '@components/form/TextInput';
import { useForm } from 'react-hook-form';
import { View, Pressable, Text } from 'react-native';

interface TestForm {
  email: string;
}

function TestWrapper({
  defaultValues = { email: '' },
  onSubmit = jest.fn(),
}: {
  defaultValues?: TestForm;
  onSubmit?: (data: TestForm) => void;
}) {
  const { control, handleSubmit } = useForm<TestForm>({ defaultValues });
  return (
    <View>
      <TextInput control={control} name="email" label="Email" placeholder="Ingresa email" />
      <Pressable onPress={handleSubmit(onSubmit)}>
        <Text>Enviar</Text>
      </Pressable>
    </View>
  );
}

describe('Form TextInput', () => {
  it('debe renderizar con label y placeholder', () => {
    const { getByText, getByPlaceholderText } = render(<TestWrapper />);
    expect(getByText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Ingresa email')).toBeTruthy();
  });

  it('debe mostrar el valor por defecto del formulario', () => {
    const { getByDisplayValue } = render(
      <TestWrapper defaultValues={{ email: 'test@mail.com' }} />,
    );
    expect(getByDisplayValue('test@mail.com')).toBeTruthy();
  });

  it('debe actualizar el valor al escribir', () => {
    const { getByPlaceholderText, getByDisplayValue } = render(<TestWrapper />);
    fireEvent.changeText(getByPlaceholderText('Ingresa email'), 'nuevo@mail.com');
    expect(getByDisplayValue('nuevo@mail.com')).toBeTruthy();
  });

  it('debe enviar el formulario con el valor ingresado', async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <TestWrapper onSubmit={onSubmit} />,
    );
    fireEvent.changeText(getByPlaceholderText('Ingresa email'), 'user@test.com');
    fireEvent.press(getByText('Enviar'));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ email: 'user@test.com' }),
        undefined,
      );
    });
  });
});
