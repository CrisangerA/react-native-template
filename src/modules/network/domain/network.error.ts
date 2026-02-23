import { AxiosError } from 'axios';
import { AXIOS_MESSAGES } from './network.messages';

export function manageAxiosError(error: unknown) {
  if (error instanceof AxiosError) {
    if (error.code?.includes('ERR_NETWORK')) {
      return new Error(AXIOS_MESSAGES.NETWORK_ERROR);
    }

    if (error.code?.includes('ECONNREFUSED')) {
      return new Error(AXIOS_MESSAGES.CONNECTION_REFUSED);
    }

    if (error.status === 400) {
      if (error.response?.data?.errors) {
        const e = new Error(JSON.stringify(error.response?.data?.errors));
        e.name = 'FormError';
        return e;
      }

      if (error.response?.data?.message?.includes('Duplicate identifier')) {
        const e = new Error(error.response.data.message);
        e.name = 'DuplicateIdentifierError';
        return e;
      }

      return new Error(AXIOS_MESSAGES.BAD_REQUEST);
    }

    if (error.response?.data?.message) {
      return new Error(error.response.data.message);
    }

    return new Error(error.message + ' - ' + error.code);
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error(AXIOS_MESSAGES.UNKNOWN_ERROR);
}
