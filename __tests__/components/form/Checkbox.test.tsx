import React from 'react';
import { render, fireEvent, waitFor } from '@utils/test-utils';
import { Checkbox } from '@components/form/Checkbox';
import { useForm } from 'react-hook-form';
import { View, Pressable, Text } from 'react-native';

interface TestForm {
  accepted: boolean;
}

function TestWrapper({
  defaultValues = { accepted: false },
  onSubmit = jest.fn(),
}: {
  defaultValues?: TestForm;
  onSubmit?: (data: TestForm) => void;
}) {
  const { control, handleSubmit } = useForm<TestForm>({ defaultValues });
  return (
    <View>
      <Checkbox control={control} name="accepted" label="Aceptar términos" />
      <Pressable onPress={handleSubmit(onSubmit)}>
        <Text>Enviar</Text>
      </Pressable>
    </View>
  );
}

describe('Form Checkbox', () => {
  it('debe renderizar con label', () => {
    const { getByText } = render(<TestWrapper />);
    expect(getByText('Aceptar términos')).toBeTruthy();
  });

  it('debe iniciar desmarcado por defecto', async () => {
    const onSubmit = jest.fn();
    const { getByText } = render(<TestWrapper onSubmit={onSubmit} />);
    fireEvent.press(getByText('Enviar'));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ accepted: false }),
        undefined,
      );
    });
  });

  it('debe cambiar valor al presionar', async () => {
    const onSubmit = jest.fn();
    const { getByText } = render(<TestWrapper onSubmit={onSubmit} />);
    fireEvent.press(getByText('Aceptar términos'));
    fireEvent.press(getByText('Enviar'));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ accepted: true }),
        undefined,
      );
    });
  });

  it('debe respetar valor por defecto true', async () => {
    const onSubmit = jest.fn();
    const { getByText } = render(
      <TestWrapper defaultValues={{ accepted: true }} onSubmit={onSubmit} />,
    );
    fireEvent.press(getByText('Enviar'));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ accepted: true }),
        undefined,
      );
    });
  });
});
