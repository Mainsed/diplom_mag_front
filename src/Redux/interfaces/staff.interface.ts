import { EnumSort } from '../../enums/enum.sort';

export interface IStaff {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  password: string;
  position: string,
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  deletedBy: string;
}

export interface IStaffState {
  staff: IStaff[],
  staffCount: number,
}

export interface IStaffProps {
  staff: IStaffState,
  getStaffThunk(staffGetData?: IStaffGet): void,
  updateStaffThunk(staffToUpdate: IStaffUpdate): void,
  createStaffThunk(staffToCreate: IStaffCreate): void,
  deleteStaffThunk(staffToDelete: IStaffDelete): void,
}

export interface IStaffCreate {
  name: string;
  email: string;
  position: string,
  isAdmin: boolean;
  password?: string;
}

export interface IStaffUpdate {
  id: number;
  name?: string;
  email?: string;
  position?: string,
  isAdmin?: boolean;
  password?: string;
}

export interface IStaffDelete {
  id: number;
}

export interface IStaffGetFilter {
  id?: number;
  name?: string;
  email?: string;
  position?: string,
  isAdmin?: boolean;
}

export interface IStaffGetSort {
  order?: EnumSort;
  orderBy?: string;
}

export interface IStaffGet {
  limit?: number;
  page?: number;
  filter?: IStaffGetFilter,
  sort?: IStaffGetSort
}
