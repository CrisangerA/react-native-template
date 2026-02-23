import z from 'zod';

export const registerSchema = z
  .object({
    nombreCompleto: z
      .string()
      .min(1, 'El nombre es requerido')
      .min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z
      .string()
      .min(1, 'El email es requerido')
      .email('Ingrese un email válido'),
    password: z
      .string()
      .min(1, 'La contraseña es requerida')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
      .regex(/[0-9]/, 'Debe contener al menos un número'),
    confirmPassword: z.string().min(1, 'Confirme su contraseña'),
    fechaNacimiento: z
      .date({ message: 'La fecha de nacimiento es requerida' })
      .refine(
        date => {
          const today = new Date();
          const birthDate = new Date(date);
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }
          return age >= 18;
        },
        { message: 'Debe ser mayor de 18 años' },
      ),
    pais: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .refine(val => val.value !== '', { message: 'Seleccione un país' }),
    aceptaTerminos: z.boolean().refine(val => val === true, {
      message: 'Debe aceptar los términos y condiciones',
    }),
    recibirNewsletter: z.boolean(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Ingrese un email válido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
