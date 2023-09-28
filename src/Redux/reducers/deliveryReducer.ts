import { Dispatch } from 'redux';
import {
  IDeliveryCreate,
  IDeliveryDelete,
  IDeliveryGet,
  IDeliveryState,
  IDeliveryUpdate,
} from '../interfaces';
import { DeliveryApi } from '../../Api/delivery.api';

const initialState = {} as IDeliveryState;

const CLEAR_ERROR = 'CLEAR_ERROR',
  GET_DELIVERY = 'GET_DELIVERY',
  SET_DELIVERY_ERROR = 'SET_DELIVERY_ERROR';

export type ActionTypes =
  GetDeliveryActionType |
  SetErrorActionType |
  ClearErrorActionType

const deliveryReducer = (state = initialState, action: ActionTypes): IDeliveryState => {
  switch (action.type) {
    case GET_DELIVERY: {
      return action.data;
    }

    case CLEAR_ERROR: {
      if (state.deliveryError === undefined) {
        return state;
      }
      return { ...state, deliveryError: undefined };
    }

    case SET_DELIVERY_ERROR: {
      return { ...state, deliveryError: action.data };
    }

    default:
      return state;
  }
};

type GetDeliveryActionType = {
  type: typeof GET_DELIVERY;
  data: IDeliveryState
}

type SetErrorActionType = {
  type: typeof SET_DELIVERY_ERROR;
  data: string;
}

type ClearErrorActionType = {
  type: typeof CLEAR_ERROR;
  data: undefined;
}

// thunks
export const getDeliveryThunk = (deliveryData: IDeliveryGet) => async (dispatch: Dispatch<ActionTypes>) => {
  const deliveryResp = await DeliveryApi.getAllDelivery(deliveryData);

  if ('error' in deliveryResp) {
    dispatch({ type: SET_DELIVERY_ERROR, data: deliveryResp.error });
    return;
  }

  dispatch({ type: GET_DELIVERY, data: deliveryResp });
};

export const createDeliveryThunk = (deliveryToCreate: IDeliveryCreate) => async (dispatch: Dispatch<ActionTypes>) => {
  const delivery = await DeliveryApi.createDelivery(deliveryToCreate);

  if ('error' in delivery) {
    dispatch({ type: SET_DELIVERY_ERROR, data: delivery.error });
  }
};

export const updateDeliveryThunk = (deliveryToUpdate: IDeliveryUpdate) => async (dispatch: Dispatch<ActionTypes>) => {
  const delivery = await DeliveryApi.updateDelivery(deliveryToUpdate);

  if ('error' in delivery) {
    dispatch({ type: SET_DELIVERY_ERROR, data: delivery.error });
  }
};

export const deleteDeliveryThunk = (deliveryToDelete: IDeliveryDelete) => async (dispatch: Dispatch<ActionTypes>) => {
  const delivery = await DeliveryApi.deleteDelivery(deliveryToDelete);

  if (typeof delivery === 'object') {
    dispatch({ type: SET_DELIVERY_ERROR, data: delivery.error });
  }
};

export default deliveryReducer;
