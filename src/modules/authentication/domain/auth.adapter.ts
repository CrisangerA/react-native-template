import { SignUpPayload, SignUpResponse, UserEntity } from './auth.model';
import { RegisterFormData } from './auth.scheme';

export function signUpPayloadAdapter(form: RegisterFormData): SignUpPayload {
  return {
    email: form.email,
    password: form.password,
  };
}

export function signUpResponseAdapter(response: SignUpResponse): UserEntity {
  return response.user;
}
