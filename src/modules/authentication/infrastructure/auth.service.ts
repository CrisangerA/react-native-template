import axiosService from '@modules/network/infrastructure/axios.service';
import {
  SignInPayload,
  SignInResponse,
  SignUpPayload,
  SignUpResponse,
} from '../domain/auth.model';
import { AuthRepository } from '../domain/auth.repository';
import { manageAxiosError } from '@modules/network/domain/network.error';
// Config
import { API_ROUTES } from '@config/api.routes';

class AuthSerivce implements AuthRepository {
  async signin(data: SignInPayload) {
    try {
      const response = await axiosService.post<SignInResponse>(
        API_ROUTES.SIGNIN,
        data,
      );
      return response.data;
    } catch (error) {
      return manageAxiosError(error);
    }
  }

  async signup(data: SignUpPayload) {
    try {
      const response = await axiosService.post<SignUpResponse>(
        API_ROUTES.SIGNUP,
        data,
      );
      return response.data;
    } catch (error) {
      return manageAxiosError(error);
    }
  }
}

function createAuthService(): AuthRepository {
  return new AuthSerivce();
}

export default createAuthService();
