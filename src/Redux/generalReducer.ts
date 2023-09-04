import { IStateGeneral } from './interfaces';

const initialState = {
  staff: [
    {
      id: 1,
      name: 'name',
      email: 'email',
      isAdmin: false,
      password: 'hash',
      createdBy: 'id',
      createdAt: 'isodate',
      updatedBy: 'id',
      updatedAt: 'isodate',
      deletedBy: 'id',
    },
    {
      id: 2,
      name: 'name',
      email: 'email',
      isAdmin: true,
      password: 'hash',
      createdBy: 'id',
      createdAt: 'isodate',
      updatedBy: 'id',
      updatedAt: 'isodate',
      deletedBy: 'id',
    },
    {
      id: 3,
      name: 'name',
      email: 'email',
      isAdmin: false,
      password: 'hash',
      createdBy: 'id',
      createdAt: 'isodate',
      updatedBy: 'id',
      updatedAt: 'isodate',
      deletedBy: 'id',
    },
    {
      id: 4,
      name: 'name',
      email: 'email',
      isAdmin: false,
      password: 'hash',
      createdBy: 'id',
      createdAt: 'isodate',
      updatedBy: 'id',
      updatedAt: 'isodate',
      deletedBy: 'id',
    },
  ],
} as IStateGeneral;

const SET_STAFF = 'SET_STAFF';
//   SET_AUTH = 'SET_AUTH',
//   SET_NEW_ENTITY_DATA = 'SET_NEW_ENTITY_DATA',
//   SET_UPDATED_ENTITY_DATA = 'SET_UPDATED_ENTITY_DATA',
//   DELETE_ENTITY_DATA = 'DELETE_ENTITY_DATA';

export type ActionTypes = SetStaffActionType

const generalReducer = (state = initialState, action: ActionTypes): IStateGeneral => {
  switch (action.type) {
    case SET_STAFF: {
      return state;
    }
    default:
      return state;
  }
};

type SetStaffActionType = {
  type: typeof SET_STAFF;
  data: any[]
}

export const setStaff = (staffList: any[]): SetStaffActionType => {
  return { type: SET_STAFF, data: staffList };
};

export default generalReducer;
