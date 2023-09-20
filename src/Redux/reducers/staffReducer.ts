import { Dispatch } from 'redux';
import { IStaff, IStaffCreate, IStaffDelete, IStaffGet, IStaffState, IStaffUpdate } from '../interfaces';
import { StaffApi } from '../../Api/staff.api';

const initialState = {} as IStaffState;

const CLEAR_ERROR = 'CLEAR_ERROR',
  CREATE_STAFF = 'CREATE_STAFF',
  DELETE_STAFF = 'DELETE_STAFF',
  GET_STAFF = 'GET_STAFF',
  SET_ERROR = 'SET_ERROR',
  UPDATE_STAFF = 'UPDATE_STAFF';

export type ActionTypes = GetStaffActionType
| UpdateStaffActionType
| CreateStaffActionType
| DeleteStaffActionType
| SetErrorActionType
| ClearErrorActionType

const staffReducer = (state = initialState, action: ActionTypes): IStaffState => {
  switch (action.type) {
    case GET_STAFF: {
      return action.data;
    }

    case DELETE_STAFF: {
      const newState = { ...state };
      const newStaff = newState.staff.filter((staff) => staff.id !== action.data);
      return { ...newState, staff: newStaff };
    }

    case UPDATE_STAFF: {
      const newStaff = state.staff.map((staff) => {
        if (staff.id === action.data.id) {
          staff = action.data;
        }
        return staff;
      });
      return { ...state, staff: newStaff };
    }

    case CLEAR_ERROR: {
      if (state.staffError === undefined) {
        return state;
      }
      return { ...state, staffError: undefined };
    }

    case SET_ERROR: {
      console.log('set error', action.data);
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

type CreateStaffActionType = {
  type: typeof CREATE_STAFF;
  data: IStaff;
}

type UpdateStaffActionType = {
  type: typeof UPDATE_STAFF;
  data: IStaff;
}

type DeleteStaffActionType = {
  type: typeof DELETE_STAFF;
  data: number;
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
    return;
  }

  dispatch({ type: UPDATE_STAFF, data: staff });
};

export const deleteStaffThunk = (staffToDelete: IStaffDelete) => async (dispatch: Dispatch<ActionTypes>) => {
  const staff = await StaffApi.deleteStaff(staffToDelete);

  if (typeof staff === 'object') {
    dispatch({ type: SET_ERROR, data: staff.error });
    return;
  }

  dispatch({ type: DELETE_STAFF, data: staff });
};

export default staffReducer;
