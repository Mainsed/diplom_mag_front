import { IAuth } from './auth.interface';

export interface IAppProps {
  auth: IAuth,
  errors: string[],
  setAuthorized(isAuthorized: boolean): void,
  clearAuthError(): void,
  clearStaffError(): void,
}
