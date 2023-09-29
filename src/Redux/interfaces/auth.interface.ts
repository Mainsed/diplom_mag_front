export interface IAuth {
  isAuthorized: boolean;
  name?: string;
  error?: string;
  accessToken?: string;
}

export interface ILogout {
  error?: string;
}

export interface IAuthorize {
  email: string;
  password: string;
}

export interface IAuthState {
  auth: IAuth;
}

export interface IAuthProps {
  auth: IAuthState;
  authorizeThunk(authData: IAuthorize): void;
}
