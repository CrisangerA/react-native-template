import {
  SignInPayload,
  SignInResponse,
  SignUpPayload,
  SignUpResponse,
} from './auth.model';

export interface AuthRepository {
  signup(data: SignUpPayload): Promise<SignUpResponse | Error>;
  signin(data: SignInPayload): Promise<SignInResponse | Error>;
}
