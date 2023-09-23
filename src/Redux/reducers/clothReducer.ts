import { Dispatch } from 'redux';
import {
  IClothCreate,
  IClothDelete,
  IClothGet,
  IClothSizeInShops,
  IClothState,
  IClothUpdate,
} from '../interfaces';
import { ClothApi } from '../../Api/cloth.api';

const initialState = {} as IClothState;

const CLEAR_ERROR = 'CLEAR_ERROR',
  GET_CLOTH = 'GET_CLOTH',
  GET_CLOTH_SIZES = 'GET_CLOTH_SIZES',
  SET_CLOTH_ERROR = 'SET_CLOTH_ERROR';

export type ActionTypes =
  GetClothActionType |
  GetClothSizesActionType |
  SetErrorActionType |
  ClearErrorActionType

const clothReducer = (state = initialState, action: ActionTypes): IClothState => {
  switch (action.type) {
    case GET_CLOTH: {
      return action.data;
    }

    case GET_CLOTH_SIZES: {
      const clothIndex = state.sizesByShop?.findIndex((sizeByShop) => sizeByShop.clothId === action.data.clothId);
      let newSizesByShop = state.sizesByShop || [];

      if (clothIndex && clothIndex !== -1) {
        newSizesByShop = newSizesByShop?.map((sizeByShop) => {
          if (sizeByShop.clothId === action.data.clothId) {
            return action.data;
          }
          return sizeByShop;
        });
      } else {
        newSizesByShop.push(action.data);
      }

      return { ...state, sizesByShop: newSizesByShop };
    }

    case CLEAR_ERROR: {
      if (state.clothError === undefined) {
        return state;
      }
      return { ...state, clothError: undefined };
    }

    case SET_CLOTH_ERROR: {
      return { ...state, clothError: action.data };
    }

    default:
      return state;
  }
};

type GetClothActionType = {
  type: typeof GET_CLOTH;
  data: IClothState
}

type GetClothSizesActionType = {
  type: typeof GET_CLOTH_SIZES;
  data: IClothSizeInShops
}

type SetErrorActionType = {
  type: typeof SET_CLOTH_ERROR;
  data: string;
}

type ClearErrorActionType = {
  type: typeof CLEAR_ERROR;
  data: undefined;
}

// thunks
export const getClothThunk = (clothData: IClothGet) => async (dispatch: Dispatch<ActionTypes>) => {
  const clothResp = await ClothApi.getAllCloth(clothData);

  if ('error' in clothResp) {
    dispatch({ type: SET_CLOTH_ERROR, data: clothResp.error });
    return;
  }

  dispatch({ type: GET_CLOTH, data: clothResp });
};

export const getClothSizesThunk = (shopId: number) => async (dispatch: Dispatch<ActionTypes>) => {
  const clothResp = await ClothApi.getClothSizeCountByShop(shopId);

  if ('error' in clothResp) {
    dispatch({ type: SET_CLOTH_ERROR, data: clothResp.error });
    return;
  }

  dispatch({ type: GET_CLOTH_SIZES, data: clothResp });
};

export const createClothThunk = (clothToCreate: IClothCreate) => async (dispatch: Dispatch<ActionTypes>) => {
  const cloth = await ClothApi.createCloth(clothToCreate);

  if ('error' in cloth) {
    dispatch({ type: SET_CLOTH_ERROR, data: cloth.error });
  }
};

export const updateClothThunk = (clothToUpdate: IClothUpdate) => async (dispatch: Dispatch<ActionTypes>) => {
  const cloth = await ClothApi.updateCloth(clothToUpdate);

  if ('error' in cloth) {
    dispatch({ type: SET_CLOTH_ERROR, data: cloth.error });
  }
};

export const deleteClothThunk = (clothToDelete: IClothDelete) => async (dispatch: Dispatch<ActionTypes>) => {
  const cloth = await ClothApi.deleteCloth(clothToDelete);

  if (typeof cloth === 'object') {
    dispatch({ type: SET_CLOTH_ERROR, data: cloth.error });
  }
};

export default clothReducer;
