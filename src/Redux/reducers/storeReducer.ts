import { Dispatch } from 'redux';
import { IStoreCreate, IStoreDelete, IStoreGet, IStoreState, IStoreUpdate } from '../interfaces';
import { StoreApi } from '../../Api/store.api';

const initialState = {} as IStoreState;

const CLEAR_ERROR = 'CLEAR_ERROR',
  GET_STORE = 'GET_STORE',
  SET_STORE_ERROR = 'SET_STORE_ERROR';

export type ActionTypes = GetStoreActionType | SetErrorActionType | ClearErrorActionType

const storeReducer = (state = initialState, action: ActionTypes): IStoreState => {
  switch (action.type) {
    case GET_STORE: {
      return action.data;
    }

    case CLEAR_ERROR: {
      if (state.storeError === undefined) {
        return state;
      }
      return { ...state, storeError: undefined };
    }

    case SET_STORE_ERROR: {
      return { ...state, storeError: action.data };
    }

    default:
      return state;
  }
};

type GetStoreActionType = {
  type: typeof GET_STORE;
  data: IStoreState
}

type SetErrorActionType = {
  type: typeof SET_STORE_ERROR;
  data: string;
}

type ClearErrorActionType = {
  type: typeof CLEAR_ERROR;
  data: undefined;
}

// thunks
export const getStoreThunk = (storeData: IStoreGet) => async (dispatch: Dispatch<ActionTypes>) => {
  const storeResp = await StoreApi.getAllStore(storeData);

  if ('error' in storeResp) {
    dispatch({ type: SET_STORE_ERROR, data: storeResp.error });
    return;
  }

  dispatch({ type: GET_STORE, data: storeResp });
};

export const createStoreThunk = (storeToCreate: IStoreCreate) => async (dispatch: Dispatch<ActionTypes>) => {
  const store = await StoreApi.createStore(storeToCreate);

  if ('error' in store) {
    dispatch({ type: SET_STORE_ERROR, data: store.error });
  }
};

export const updateStoreThunk = (storeToUpdate: IStoreUpdate) => async (dispatch: Dispatch<ActionTypes>) => {
  const store = await StoreApi.updateStore(storeToUpdate);

  if ('error' in store) {
    dispatch({ type: SET_STORE_ERROR, data: store.error });
  }
};

export const deleteStoreThunk = (storeToDelete: IStoreDelete) => async (dispatch: Dispatch<ActionTypes>) => {
  const store = await StoreApi.deleteStore(storeToDelete);

  if (typeof store === 'object') {
    dispatch({ type: SET_STORE_ERROR, data: store.error });
  }
};

export default storeReducer;
