import { Dispatch } from 'redux';
import { IClient, IClientCreate, IClientDelete, IClientGet, IClientState, IClientUpdate } from '../interfaces';
import { ClientApi } from '../../Api/client.api';

const initialState = {} as IClientState;

const CREATE_CLIENT = 'CREATE_CLIENT',
  DELETE_CLIENT = 'DELETE_CLIENT',
  GET_CLIENT = 'GET_CLIENT',
  UPDATE_CLIENT = 'UPDATE_CLIENT';

export type ActionTypes = GetClientActionType | UpdateClientActionType | CreateClientActionType | DeleteClientActionType

const clientReducer = (state = initialState, action: ActionTypes): IClientState => {
  switch (action.type) {
    case GET_CLIENT: {
      return action.data;
    }

    case CREATE_CLIENT: {
      const newState = { ...state };
      newState.client.push(action.data);
      return newState;
    }

    case DELETE_CLIENT: {
      const newState = { ...state };
      const newClient = newState.client.filter((client) => client.id !== action.data);
      return { ...newState, client: newClient };
    }

    case UPDATE_CLIENT: {
      const newClient = state.client.map((client) => {
        if (client.id === action.data.id) {
          client = action.data;
        }
        return client;
      });
      return { ...state, client: newClient };
    }

    default:
      return state;
  }
};

type GetClientActionType = {
  type: typeof GET_CLIENT;
  data: IClientState
}

type CreateClientActionType = {
  type: typeof CREATE_CLIENT;
  data: IClient
}

type UpdateClientActionType = {
  type: typeof UPDATE_CLIENT;
  data: IClient
}

type DeleteClientActionType = {
  type: typeof DELETE_CLIENT;
  data: number
}

// thunks
export const getClientThunk = (clientData: IClientGet) => async (dispatch: Dispatch<ActionTypes>) => {
  const clientResp = await ClientApi.getAllClient(clientData);

  dispatch({ type: GET_CLIENT, data: clientResp });
};

export const createClientThunk = (clientToCreate: IClientCreate) => async (dispatch: Dispatch<ActionTypes>) => {
  const client = await ClientApi.createClient(clientToCreate);

  dispatch({ type: CREATE_CLIENT, data: client });
};

export const updateClientThunk = (clientToUpdate: IClientUpdate) => async (dispatch: Dispatch<ActionTypes>) => {
  const client = await ClientApi.updateClient(clientToUpdate);

  dispatch({ type: UPDATE_CLIENT, data: client });
};

export const deleteClientThunk = (clientToDelete: IClientDelete) => async (dispatch: Dispatch<ActionTypes>) => {
  const client = await ClientApi.deleteClient(clientToDelete);

  dispatch({ type: DELETE_CLIENT, data: client });
};

export default clientReducer;
