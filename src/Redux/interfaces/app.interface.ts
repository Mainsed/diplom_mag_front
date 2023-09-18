import { IAuth } from './auth.interface';

export interface IAppProps {
  auth: IAuth,
  setAuthorized(isAuthorized: boolean): void,
}
