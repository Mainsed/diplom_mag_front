import {
  IAuth,
  IAuthState,
  IAuthorize,
} from '../Redux/interfaces';
import { instance } from './axios.instance';

const auth = {
  isAuthorized: true,
  name: 'test',
} as IAuth;

export const AuthApi = {
  authorize: (authData: IAuthorize): Promise<IAuthState> | IAuthState => {
    return {
      auth,
    };
  },

};
