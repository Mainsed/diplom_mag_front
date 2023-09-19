export interface IAuth {
  isAuthorized: boolean,
  name?: string,
  error?: string,
}

export interface IAuthorize {
  nameOrEmail: string,
  password: string,
}

export interface IAuthState {
  auth: IAuth,
}

export interface IAuthProps {
  auth: IAuthState,
  authorizeThunk(authData: IAuthorize): void,
}
