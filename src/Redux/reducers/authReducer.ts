import { Dispatch } from 'redux';
import { IAuthState, IAuthorize } from '../interfaces';
import { AuthApi } from '../../Api/auth.api';

const initialState = {} as IAuthState;

const AUTHORIZE = 'AUTHORIZE', SET_AUTHORIZE = 'SET_AUTHORIZE';

export type ActionTypes = AuthorizeActionType | SetAuthorizeActionType;

const authReducer = (state = initialState, action: ActionTypes): IAuthState => {
  switch (action.type) {
    case AUTHORIZE: {
      return action.data;
    }

    case SET_AUTHORIZE: {
      const newAuth = { ...state.auth };
      newAuth.isAuthorized = action.data;
      return { ...state, auth: newAuth };
    }

    default:
      return state;
  }
};

type AuthorizeActionType = {
  type: typeof AUTHORIZE;
  data: IAuthState
}

type SetAuthorizeActionType = {
  type: typeof SET_AUTHORIZE;
  data: boolean
}

// actions
export const setAuthorized = (isAuthorized: boolean): SetAuthorizeActionType => {
  console.log(isAuthorized);
  return { type: SET_AUTHORIZE, data: isAuthorized };
};

// thunks
export const authorizeThunk = (authData: IAuthorize) => async (dispatch: Dispatch<ActionTypes>) => {
  const authResp = await AuthApi.authorize(authData);

  dispatch({ type: AUTHORIZE, data: authResp });
};

export default authReducer;
