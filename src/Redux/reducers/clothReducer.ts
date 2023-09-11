import { Dispatch } from 'redux';
import {
  ICloth,
  IClothCreate,
  IClothDelete,
  IClothGet,
  IClothSizeInShop,
  IClothSizeInShops,
  IClothState,
  IClothUpdate
} from '../interfaces';
import { ClothApi } from '../../Api/cloth.api';

const initialState = {} as IClothState;

const CREATE_CLOTH = 'CREATE_CLOTH',
  DELETE_CLOTH = 'DELETE_CLOTH',
  GET_CLOTH = 'GET_CLOTH',
  GET_CLOTH_SIZES = 'GET_CLOTH_SIZES',
  UPDATE_CLOTH = 'UPDATE_CLOTH';

export type ActionTypes =
  GetClothActionType |
  UpdateClothActionType |
  CreateClothActionType |
  DeleteClothActionType |
  GetClothSizesActionType

const clothReducer = (state = initialState, action: ActionTypes): IClothState => {
  switch (action.type) {
    case GET_CLOTH: {
      return action.data;
    }

    case GET_CLOTH_SIZES: {
      const clothIndex = state.sizesByShop?.findIndex((sizeByShop) => sizeByShop.clothId === action.data.clothId);
      let newSizesByShop = state.sizesByShop || [];
      console.log(action.data, clothIndex)
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
      console.log(newSizesByShop)
      return { ...state, sizesByShop: newSizesByShop };
    }

    case CREATE_CLOTH: {
      const newState = { ...state };
      newState.cloth.push(action.data);
      return newState;
    }

    case DELETE_CLOTH: {
      const newState = { ...state };
      const newCloth = newState.cloth.filter((cloth) => cloth.id !== action.data);
      return { ...newState, cloth: newCloth };
    }

    case UPDATE_CLOTH: {
      const newCloth = state.cloth.map((cloth) => {
        if (cloth.id === action.data.id) {
          cloth = action.data;
        }
        return cloth;
      });
      return { ...state, cloth: newCloth };
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

type CreateClothActionType = {
  type: typeof CREATE_CLOTH;
  data: ICloth
}

type UpdateClothActionType = {
  type: typeof UPDATE_CLOTH;
  data: ICloth
}

type DeleteClothActionType = {
  type: typeof DELETE_CLOTH;
  data: number
}

// thunks
export const getClothThunk = (clothData: IClothGet) => async (dispatch: Dispatch<ActionTypes>) => {
  const clothResp = await ClothApi.getAllCloth(clothData);

  dispatch({ type: GET_CLOTH, data: clothResp });
};

export const getClothSizesThunk = (shopId: number) => async (dispatch: Dispatch<ActionTypes>) => {
  const clothResp = await ClothApi.getClothSizeCountByShop(shopId);

  dispatch({ type: GET_CLOTH_SIZES, data: clothResp });
};

export const createClothThunk = (clothToCreate: IClothCreate) => async (dispatch: Dispatch<ActionTypes>) => {
  const cloth = await ClothApi.createCloth(clothToCreate);

  dispatch({ type: CREATE_CLOTH, data: cloth });
};

export const updateClothThunk = (clothToUpdate: IClothUpdate) => async (dispatch: Dispatch<ActionTypes>) => {
  const cloth = await ClothApi.updateCloth(clothToUpdate);

  dispatch({ type: UPDATE_CLOTH, data: cloth });
};

export const deleteClothThunk = (clothToDelete: IClothDelete) => async (dispatch: Dispatch<ActionTypes>) => {
  const cloth = await ClothApi.deleteCloth(clothToDelete);

  dispatch({ type: DELETE_CLOTH, data: cloth });
};

export default clothReducer;
