import { Dispatch } from 'redux';
import {
  IDelivery,
  IDeliveryCreate,
  IDeliveryDelete,
  IDeliveryGet,
  IDeliveryState,
  IDeliveryUpdate,
} from '../interfaces';
import { DeliveryApi } from '../../Api/delivery.api';

const initialState = {} as IDeliveryState;

const CREATE_DELIVERY = 'CREATE_DELIVERY',
  DELETE_DELIVERY = 'DELETE_DELIVERY',
  GET_DELIVERY = 'GET_DELIVERY',
  UPDATE_DELIVERY = 'UPDATE_DELIVERY';

export type ActionTypes =
  GetDeliveryActionType |
  UpdateDeliveryActionType |
  CreateDeliveryActionType |
  DeleteDeliveryActionType

const deliveryReducer = (state = initialState, action: ActionTypes): IDeliveryState => {
  switch (action.type) {
    case GET_DELIVERY: {
      return action.data;
    }

    case CREATE_DELIVERY: {
      const newState = { ...state };
      newState.delivery.push(action.data);
      return newState;
    }

    case DELETE_DELIVERY: {
      const newState = { ...state };
      const newDelivery = newState.delivery.filter((delivery) => delivery.id !== action.data);
      return { ...newState, delivery: newDelivery };
    }

    case UPDATE_DELIVERY: {
      const newDelivery = state.delivery.map((delivery) => {
        if (delivery.id === action.data.id) {
          delivery = action.data;
        }
        return delivery;
      });
      return { ...state, delivery: newDelivery };
    }

    default:
      return state;
  }
};

type GetDeliveryActionType = {
  type: typeof GET_DELIVERY;
  data: IDeliveryState
}

type CreateDeliveryActionType = {
  type: typeof CREATE_DELIVERY;
  data: IDelivery
}

type UpdateDeliveryActionType = {
  type: typeof UPDATE_DELIVERY;
  data: IDelivery
}

type DeleteDeliveryActionType = {
  type: typeof DELETE_DELIVERY;
  data: number
}

// thunks
export const getDeliveryThunk = (deliveryData: IDeliveryGet) => async (dispatch: Dispatch<ActionTypes>) => {
  const deliveryResp = await DeliveryApi.getAllDelivery(deliveryData);

  dispatch({ type: GET_DELIVERY, data: deliveryResp });
};

export const createDeliveryThunk = (deliveryToCreate: IDeliveryCreate) => async (dispatch: Dispatch<ActionTypes>) => {
  const delivery = await DeliveryApi.createDelivery(deliveryToCreate);

  dispatch({ type: CREATE_DELIVERY, data: delivery });
};

export const updateDeliveryThunk = (deliveryToUpdate: IDeliveryUpdate) => async (dispatch: Dispatch<ActionTypes>) => {
  const delivery = await DeliveryApi.updateDelivery(deliveryToUpdate);

  dispatch({ type: UPDATE_DELIVERY, data: delivery });
};

export const deleteDeliveryThunk = (deliveryToDelete: IDeliveryDelete) => async (dispatch: Dispatch<ActionTypes>) => {
  const delivery = await DeliveryApi.deleteDelivery(deliveryToDelete);

  dispatch({ type: DELETE_DELIVERY, data: delivery });
};

export default deliveryReducer;
