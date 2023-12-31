import { AxiosError } from 'axios';
import {
  IAuth,
  IAuthState,
  IAuthorize,
  ILogout,
} from '../Redux/interfaces';
import { instance } from './axios.instance';
import Cookies from 'js-cookie';

export const AuthApi = {
  authorize: async (authData: IAuthorize): Promise<IAuthState> => {
    try {
      const auth = (await instance.post<IAuth>('auth/login', authData)).data;
      if (auth.isAuthorized && auth.name && auth.accessToken) {
        Cookies.set('isAuthorized', auth.isAuthorized.toString());
        Cookies.set('userName', auth.name);
      }

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
      Cookies.remove('isAuthorized');
      Cookies.remove('userName');
      return {};
    } catch (e) {
      const error = e as AxiosError<any>;
      return {
        error: error.response?.data?.message,
      };
    }
  },
};
