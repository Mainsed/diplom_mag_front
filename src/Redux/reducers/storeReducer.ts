import { Dispatch } from 'redux';
import { IStore, IStoreCreate, IStoreDelete, IStoreGet, IStoreState, IStoreUpdate } from '../interfaces';
import { StoreApi } from '../../Api/store.api';

const initialState = {} as IStoreState;

const CREATE_STORE = 'CREATE_STORE',
  DELETE_STORE = 'DELETE_STORE',
  GET_STORE = 'GET_STORE',
  UPDATE_STORE = 'UPDATE_STORE';

export type ActionTypes = GetStoreActionType | UpdateStoreActionType | CreateStoreActionType | DeleteStoreActionType

const storeReducer = (state = initialState, action: ActionTypes): IStoreState => {
  switch (action.type) {
    case GET_STORE: {
      return action.data;
    }

    case CREATE_STORE: {
      const newState = { ...state };
      newState.store.push(action.data);
      return newState;
    }

    case DELETE_STORE: {
      const newState = { ...state };
      const newStore = newState.store.filter((store) => store.id !== action.data);
      return { ...newState, store: newStore };
    }

    case UPDATE_STORE: {
      const newStore = state.store.map((store) => {
        if (store.id === action.data.id) {
          store = action.data;
        }
        return store;
      });
      return { ...state, store: newStore };
    }

    default:
      return state;
  }
};

type GetStoreActionType = {
  type: typeof GET_STORE;
  data: IStoreState
}

type CreateStoreActionType = {
  type: typeof CREATE_STORE;
  data: IStore
}

type UpdateStoreActionType = {
  type: typeof UPDATE_STORE;
  data: IStore
}

type DeleteStoreActionType = {
  type: typeof DELETE_STORE;
  data: number
}

// thunks
export const getStoreThunk = (storeData: IStoreGet) => async (dispatch: Dispatch<ActionTypes>) => {
  const storeResp = await StoreApi.getAllStore(storeData);

  dispatch({ type: GET_STORE, data: storeResp });
};

export const createStoreThunk = (storeToCreate: IStoreCreate) => async (dispatch: Dispatch<ActionTypes>) => {
  const store = await StoreApi.createStore(storeToCreate);

  dispatch({ type: CREATE_STORE, data: store });
};

export const updateStoreThunk = (storeToUpdate: IStoreUpdate) => async (dispatch: Dispatch<ActionTypes>) => {
  const store = await StoreApi.updateStore(storeToUpdate);

  dispatch({ type: UPDATE_STORE, data: store });
};

export const deleteStoreThunk = (storeToDelete: IStoreDelete) => async (dispatch: Dispatch<ActionTypes>) => {
  const store = await StoreApi.deleteStore(storeToDelete);

  dispatch({ type: DELETE_STORE, data: store });
};

export default storeReducer;
