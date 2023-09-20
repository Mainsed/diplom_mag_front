import { AxiosError } from 'axios';
import {
  IAuth,
  IAuthState,
  IAuthorize,
  ILogout,
} from '../Redux/interfaces';
import { instance } from './axios.instance';

export const AuthApi = {
  authorize: async (authData: IAuthorize): Promise<IAuthState> => {
    try {
      const auth = (await instance.post<IAuth>('auth/login', authData)).data;

      return {
        auth,
      };
    } catch (e) {
      const error = e as AxiosError<any>;
      return {
        auth: {
          isAuthorized: false,
          error: error.response?.data?.message,
        },
      };
    }
  },
  logout: async (): Promise<ILogout> => {
    try {
      await instance.post<ILogout>('auth/logout');
      return {};
    } catch (e) {
      const error = e as AxiosError<any>;
      return {
        error: error.response?.data?.message,
      };
    }
  },
};
