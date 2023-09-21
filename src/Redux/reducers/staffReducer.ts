import { Dispatch } from 'redux';
import { IStaffCreate, IStaffDelete, IStaffGet, IStaffState, IStaffUpdate } from '../interfaces';
import { StaffApi } from '../../Api/staff.api';

const initialState = {} as IStaffState;

const CLEAR_ERROR = 'CLEAR_ERROR',
  GET_STAFF = 'GET_STAFF',
  SET_ERROR = 'SET_ERROR';

export type ActionTypes = GetStaffActionType
| SetErrorActionType
| ClearErrorActionType

const staffReducer = (state = initialState, action: ActionTypes): IStaffState => {
  switch (action.type) {
    case GET_STAFF: {
      return action.data;
    }

    case CLEAR_ERROR: {
      if (state.staffError === undefined) {
        return state;
      }
      return { ...state, staffError: undefined };
    }

    case SET_ERROR: {
      return { ...state, staffError: action.data };
    }

    default:
      return state;
  }
};

type GetStaffActionType = {
  type: typeof GET_STAFF;
  data: IStaffState;
}

type SetErrorActionType = {
  type: typeof SET_ERROR;
  data: string;
}

type ClearErrorActionType = {
  type: typeof CLEAR_ERROR;
  data: undefined;
}

// actions
export const clearStaffError = (): ClearErrorActionType => {
  return { type: CLEAR_ERROR, data: undefined };
};

// thunks
export const getStaffThunk = (staffData: IStaffGet) => async (dispatch: Dispatch<ActionTypes>) => {
  const staffResp = await StaffApi.getAllStaff(staffData);

  if ('error' in staffResp) {
    dispatch({ type: SET_ERROR, data: staffResp.error });
    return;
  }

  dispatch({ type: GET_STAFF, data: staffResp });
};

export const createStaffThunk = (staffToCreate: IStaffCreate) => async (dispatch: Dispatch<ActionTypes>) => {
  const staffResp = await StaffApi.createStaff(staffToCreate);

  if ('error' in staffResp) {
    dispatch({ type: SET_ERROR, data: staffResp.error });
  }
};

export const updateStaffThunk = (staffToUpdate: IStaffUpdate) => async (dispatch: Dispatch<ActionTypes>) => {
  const staff = await StaffApi.updateStaff(staffToUpdate);

  if ('error' in staff) {
    dispatch({ type: SET_ERROR, data: staff.error });
  }
};

export const deleteStaffThunk = (staffToDelete: IStaffDelete) => async (dispatch: Dispatch<ActionTypes>) => {
  const staff = await StaffApi.deleteStaff(staffToDelete);

  if (typeof staff === 'object') {
    dispatch({ type: SET_ERROR, data: staff.error });
  }
};

export default staffReducer;
