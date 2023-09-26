import { Dispatch } from 'redux';
import { IOrderCreate, IOrderDelete, IOrderGet, IOrderState, IOrderUpdate } from '../interfaces';
import { OrderApi } from '../../Api/order.api';

const initialState = {} as IOrderState;

const CLEAR_ERROR = 'CLEAR_ERROR',
  GET_ORDER = 'GET_ORDER',
  SET_ORDER_ERROR = 'SET_ORDER_ERROR';

export type ActionTypes = GetOrderActionType | SetErrorActionType | ClearErrorActionType

const orderReducer = (state = initialState, action: ActionTypes): IOrderState => {
  switch (action.type) {
    case GET_ORDER: {
      return action.data;
    }

    case CLEAR_ERROR: {
      if (state.orderError === undefined) {
        return state;
      }
      return { ...state, orderError: undefined };
    }

    case SET_ORDER_ERROR: {
      return { ...state, orderError: action.data };
    }

    default:
      return state;
  }
};

type GetOrderActionType = {
  type: typeof GET_ORDER;
  data: IOrderState
}

type SetErrorActionType = {
  type: typeof SET_ORDER_ERROR;
  data: string;
}

type ClearErrorActionType = {
  type: typeof CLEAR_ERROR;
  data: undefined;
}

// thunks
export const getOrderThunk = (orderData: IOrderGet) => async (dispatch: Dispatch<ActionTypes>) => {
  const orderResp = await OrderApi.getAllOrder(orderData);

  if ('error' in orderResp) {
    dispatch({ type: SET_ORDER_ERROR, data: orderResp.error });
    return;
  }

  dispatch({ type: GET_ORDER, data: orderResp });
};

export const createOrderThunk = (orderToCreate: IOrderCreate) => async (dispatch: Dispatch<ActionTypes>) => {
  const order = await OrderApi.createOrder(orderToCreate);

  if ('error' in order) {
    dispatch({ type: SET_ORDER_ERROR, data: order.error });
  }
};

export const updateOrderThunk = (orderToUpdate: IOrderUpdate) => async (dispatch: Dispatch<ActionTypes>) => {
  const order = await OrderApi.updateOrder(orderToUpdate);

  if ('error' in order) {
    dispatch({ type: SET_ORDER_ERROR, data: order.error });
  }
};

export const deleteOrderThunk = (orderToDelete: IOrderDelete) => async (dispatch: Dispatch<ActionTypes>) => {
  const order = await OrderApi.deleteOrder(orderToDelete);

  if (typeof order === 'object') {
    dispatch({ type: SET_ORDER_ERROR, data: order.error });
  }
};

export default orderReducer;
