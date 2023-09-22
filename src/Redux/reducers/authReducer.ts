import { Dispatch } from 'redux';
import { IAuthState, IAuthorize, ILogout } from '../interfaces';
import { AuthApi } from '../../Api/auth.api';

const initialState = {} as IAuthState;

const AUTHORIZE = 'AUTHORIZE',
  CLEAR_ERROR = 'CLEAR_ERROR',
  LOGOUT = 'LOGOUT',
  SET_AUTHORIZE = 'SET_AUTHORIZE';

export type ActionTypes = AuthorizeActionType | SetAuthorizeActionType | ClearErrorActionType | LogoutActionType;

const authReducer = (state = initialState, action: ActionTypes): IAuthState => {
  switch (action.type) {
    case AUTHORIZE: {
      return action.data;
    }

    case SET_AUTHORIZE: {
      const newAuth = { ...state.auth };
      newAuth.isAuthorized = action.data.isAuthorized;
      newAuth.name = action.data.userName;
      return { ...state, auth: newAuth };
    }

    case CLEAR_ERROR: {
      if (state.auth.error === undefined) {
        return state;
      }
      return { ...state, auth: { ...state.auth, error: undefined } };
    }

    case LOGOUT: {
      if (action.data.error) {
        return { ...state, auth: { ...state.auth, error: action.data.error } };
      }
      return { ...state, auth: { isAuthorized: false, name: undefined } };
    }

    default:
      return state;
  }
};

type AuthorizeActionType = {
  type: typeof AUTHORIZE;
  data: IAuthState;
}

type LogoutActionType = {
  type: typeof LOGOUT;
  data: ILogout;
}

type SetAuthorizeActionType = {
  type: typeof SET_AUTHORIZE;
  data: {
    isAuthorized: boolean,
    userName?: string
  };
}

type ClearErrorActionType = {
  type: typeof CLEAR_ERROR;
  data: undefined;
}

// actions
export const setAuthorized = (isAuthorized: boolean, userName?: string): SetAuthorizeActionType => {
  return { type: SET_AUTHORIZE, data: { isAuthorized, userName } };
};

export const clearAuthError = (): ClearErrorActionType => {
  return { type: CLEAR_ERROR, data: undefined };
};

// thunks
export const authorizeThunk = (authData: IAuthorize) => async (dispatch: Dispatch<ActionTypes>) => {
  const authResp = await AuthApi.authorize(authData);

  dispatch({ type: AUTHORIZE, data: authResp });
};

export const logoutThunk = () => async (dispatch: Dispatch<ActionTypes>) => {
  const logoutResp = await AuthApi.logout();

  dispatch({ type: LOGOUT, data: logoutResp });
};

export default authReducer;
