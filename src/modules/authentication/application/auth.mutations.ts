import { useMutation } from '@tanstack/react-query';
// Domain
import { RegisterFormData } from '../domain/auth.scheme';
import {
  signUpPayloadAdapter,
  signUpResponseAdapter,
} from '../domain/auth.adapter';
// Infrastructure
import authService from '../infrastructure/auth.service';

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
