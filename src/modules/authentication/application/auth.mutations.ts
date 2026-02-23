import { useMutation } from '@tanstack/react-query';
// Domain
import { RegisterFormData, SignInFormData } from '../domain/auth.scheme';
import {
  signInPayloadAdapter,
  signInResponseAdapter,
  signUpPayloadAdapter,
  signUpResponseAdapter,
} from '../domain/auth.adapter';
// Infrastructure
import authService from '../infrastructure/auth.service';

/**
 * Hook de mutación para registro de usuario
 */
export function useSignupMutation() {
  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const payload = signUpPayloadAdapter(data);
      const result = await authService.signup(payload);
      if (result instanceof Error) {
        throw result;
      }

      const response = signUpResponseAdapter(result);
      return response;
    },
  });
}

/**
 * Hook de mutación para inicio de sesión de usuario
 */
export function useSigninMutation() {
  return useMutation({
    mutationFn: async (data: SignInFormData) => {
      const payload = signInPayloadAdapter(data);
      const result = await authService.signin(payload);
      if (result instanceof Error) {
        throw result;
      }

      const response = signInResponseAdapter(result);
      return response;
    },
  });
}
