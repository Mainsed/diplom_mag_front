import { Dispatch } from 'redux';
import { IStaff, IStaffCreate, IStaffDelete, IStaffGet, IStaffState, IStaffUpdate } from '../interfaces';
import { StaffApi } from '../../Api/staff.api';

const initialState = {} as IStaffState;

const CREATE_STAFF = 'CREATE_STAFF',
  DELETE_STAFF = 'DELETE_STAFF',
  GET_STAFF = 'GET_STAFF',
  UPDATE_STAFF = 'UPDATE_STAFF';

export type ActionTypes = GetStaffActionType | UpdateStaffActionType | CreateStaffActionType | DeleteStaffActionType

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

    default:
      return state;
  }
};

type GetStaffActionType = {
  type: typeof GET_STAFF;
  data: IStaffState
}

type CreateStaffActionType = {
  type: typeof CREATE_STAFF;
  data: IStaff
}

type UpdateStaffActionType = {
  type: typeof UPDATE_STAFF;
  data: IStaff
}

type DeleteStaffActionType = {
  type: typeof DELETE_STAFF;
  data: number
}

// actions
export const getStaff = (staffList: IStaff[], staffCount: number): GetStaffActionType => {
  return { type: GET_STAFF, data: { staff: staffList, staffCount } };
};

export const updateStaff = (staffToUpdate: IStaff): UpdateStaffActionType => {
  return { type: UPDATE_STAFF, data: staffToUpdate };
};

export const deleteStaff = (staffToDelete: number): DeleteStaffActionType => {
  return { type: DELETE_STAFF, data: staffToDelete };
};

// thunks
export const getStaffThunk = (staffData: IStaffGet) => async (dispatch: Dispatch<ActionTypes>) => {
  const staffResp = await StaffApi.getAlStaff(staffData);

  dispatch({ type: GET_STAFF, data: staffResp });
};

export const createStaffThunk = (staffToCreate: IStaffCreate) => async (dispatch: Dispatch<ActionTypes>) => {
  await StaffApi.createStaff(staffToCreate);
};

export const updateStaffThunk = (staffToUpdate: IStaffUpdate) => async (dispatch: Dispatch<ActionTypes>) => {
  const staff = await StaffApi.updateStaff(staffToUpdate);

  dispatch({ type: UPDATE_STAFF, data: staff });
};

export const deleteStaffThunk = (staffToDelete: IStaffDelete) => async (dispatch: Dispatch<ActionTypes>) => {
  const staff = await StaffApi.deleteStaff(staffToDelete);

  dispatch({ type: DELETE_STAFF, data: staff });
};

export default staffReducer;
