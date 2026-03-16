import * as yup from 'yup';
import type { InferType } from 'yup';

export const registerSchema = yup.object({
  nombreCompleto: yup
    .string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: yup
    .string()
    .required('El email es requerido')
    .email('Ingrese un email válido'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número'),
  confirmPassword: yup
    .string()
    .required('Confirme su contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
  fechaNacimiento: yup
    .date()
    .typeError('La fecha de nacimiento es requerida')
    .required('La fecha de nacimiento es requerida')
    .test('is-adult', 'Debe ser mayor de 18 años', (value?: Date) => {
      if (!value) {
        return false;
      }
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age >= 18;
    }),
  pais: yup
    .object({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required('Seleccione un país')
    .test(
      'country-selected',
      'Seleccione un país',
      (value?: { label: string; value: string }) => Boolean(value?.value),
    ),
  aceptaTerminos: yup
    .boolean()
    .oneOf([true], 'Debe aceptar los términos y condiciones')
    .required('Debe aceptar los términos y condiciones'),
  recibirNewsletter: yup.boolean().required(),
});

export const signInSchema = yup.object({
  email: yup
    .string()
    .required('El email es requerido')
    .email('Ingrese un email válido'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export type RegisterFormData = InferType<typeof registerSchema>;
export type SignInFormData = InferType<typeof signInSchema>;
