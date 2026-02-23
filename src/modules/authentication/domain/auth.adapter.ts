import {
  SignInPayload,
  SignInResponse,
  SignUpPayload,
  SignUpResponse,
  UserEntity,
} from './auth.model';
import { RegisterFormData, SignInFormData } from './auth.scheme';

export function signUpPayloadAdapter(form: RegisterFormData): SignUpPayload {
  return {
    email: form.email,
    password: form.password,
  };
}

export function signUpResponseAdapter(response: SignUpResponse): UserEntity {
  return response.user;
}

export function signInPayloadAdapter(form: SignInFormData): SignInPayload {
  return {
    email: form.email,
    password: form.password,
  };
}

export function signInResponseAdapter(response: SignInResponse): UserEntity {
  return response.user;
}
