import { Dispatch } from 'redux';
import { IClientCreate, IClientDelete, IClientGet, IClientState, IClientUpdate } from '../interfaces';
import { ClientApi } from '../../Api/client.api';

const initialState = {} as IClientState;

const CLEAR_ERROR = 'CLEAR_ERROR',
  GET_CLIENT = 'GET_CLIENT',
  SET_ERROR = 'SET_ERROR';

export type ActionTypes = GetClientActionType | SetErrorActionType | ClearErrorActionType

const clientReducer = (state = initialState, action: ActionTypes): IClientState => {
  switch (action.type) {
    case GET_CLIENT: {
      return action.data;
    }

    case CLEAR_ERROR: {
      if (state.clientError === undefined) {
        return state;
      }
      return { ...state, clientError: undefined };
    }

    case SET_ERROR: {
      return { ...state, clientError: action.data };
    }

    default:
      return state;
  }
};

type GetClientActionType = {
  type: typeof GET_CLIENT;
  data: IClientState
}

type SetErrorActionType = {
  type: typeof SET_ERROR;
  data: string;
}

type ClearErrorActionType = {
  type: typeof CLEAR_ERROR;
  data: undefined;
}

// thunks
export const getClientThunk = (clientData: IClientGet) => async (dispatch: Dispatch<ActionTypes>) => {
  console.log('123');
  const clientResp = await ClientApi.getAllClient(clientData);
  console.log(clientResp);
  if ('error' in clientResp) {
    dispatch({ type: SET_ERROR, data: clientResp.error });
    return;
  }

  dispatch({ type: GET_CLIENT, data: clientResp });
};

export const createClientThunk = (clientToCreate: IClientCreate) => async (dispatch: Dispatch<ActionTypes>) => {
  const client = await ClientApi.createClient(clientToCreate);

  if ('error' in client) {
    dispatch({ type: SET_ERROR, data: client.error });
  }
};

export const updateClientThunk = (clientToUpdate: IClientUpdate) => async (dispatch: Dispatch<ActionTypes>) => {
  const client = await ClientApi.updateClient(clientToUpdate);

  if ('error' in client) {
    dispatch({ type: SET_ERROR, data: client.error });
  }
};

export const deleteClientThunk = (clientToDelete: IClientDelete) => async (dispatch: Dispatch<ActionTypes>) => {
  const client = await ClientApi.deleteClient(clientToDelete);

  if (typeof client === 'object') {
    dispatch({ type: SET_ERROR, data: client.error });
  }
};

export default clientReducer;
