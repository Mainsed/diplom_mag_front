import { Dispatch } from 'redux';
import { IOrder, IOrderCreate, IOrderDelete, IOrderGet, IOrderState, IOrderUpdate } from '../interfaces';
import { OrderApi } from '../../Api/order.api';

const initialState = {} as IOrderState;

const CREATE_ORDER = 'CREATE_ORDER',
  DELETE_ORDER = 'DELETE_ORDER',
  GET_ORDER = 'GET_ORDER',
  UPDATE_ORDER = 'UPDATE_ORDER';

export type ActionTypes = GetOrderActionType | UpdateOrderActionType | CreateOrderActionType | DeleteOrderActionType

const orderReducer = (state = initialState, action: ActionTypes): IOrderState => {
  switch (action.type) {
    case GET_ORDER: {
      return action.data;
    }

    case CREATE_ORDER: {
      const newState = { ...state };
      newState.order.push(action.data);
      return newState;
    }

    case DELETE_ORDER: {
      const newState = { ...state };
      const newOrder = newState.order.filter((order) => order.id !== action.data);
      return { ...newState, order: newOrder };
    }

    case UPDATE_ORDER: {
      const newOrder = state.order.map((order) => {
        if (order.id === action.data.id) {
          order = action.data;
        }
        return order;
      });
      return { ...state, order: newOrder };
    }

    default:
      return state;
  }
};

type GetOrderActionType = {
  type: typeof GET_ORDER;
  data: IOrderState
}

type CreateOrderActionType = {
  type: typeof CREATE_ORDER;
  data: IOrder
}

type UpdateOrderActionType = {
  type: typeof UPDATE_ORDER;
  data: IOrder
}

type DeleteOrderActionType = {
  type: typeof DELETE_ORDER;
  data: number
}

// thunks
export const getOrderThunk = (orderData: IOrderGet) => async (dispatch: Dispatch<ActionTypes>) => {
  const orderResp = await OrderApi.getAllOrder(orderData);

  dispatch({ type: GET_ORDER, data: orderResp });
};

export const createOrderThunk = (orderToCreate: IOrderCreate) => async (dispatch: Dispatch<ActionTypes>) => {
  const order = await OrderApi.createOrder(orderToCreate);

  dispatch({ type: CREATE_ORDER, data: order });
};

export const updateOrderThunk = (orderToUpdate: IOrderUpdate) => async (dispatch: Dispatch<ActionTypes>) => {
  const order = await OrderApi.updateOrder(orderToUpdate);

  dispatch({ type: UPDATE_ORDER, data: order });
};

export const deleteOrderThunk = (orderToDelete: IOrderDelete) => async (dispatch: Dispatch<ActionTypes>) => {
  const order = await OrderApi.deleteOrder(orderToDelete);

  dispatch({ type: DELETE_ORDER, data: order });
};

export default orderReducer;
