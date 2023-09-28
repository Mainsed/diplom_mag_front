import { IGetSort } from '../../utils/interfaces/get.sort.interface';

export interface IStaff {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  password: string;
  position: string;
  storeId: number;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  deletedBy: string;
}

export interface IStaffState {
  staff: IStaff[];
  staffCount: number;
  staffError?: string;
}

export interface IStaffError {
  error: string;
}

export interface IStaffProps {
  staff: IStaffState;
  getStaffThunk(staffGetData: IStaffGet): void;
  updateStaffThunk(staffToUpdate: IStaffUpdate): void;
  createStaffThunk(staffToCreate: IStaffCreate): void;
  deleteStaffThunk(staffToDelete: IStaffDelete): void;
}

export interface IStaffCreate {
  name: string;
  email: string;
  position: string;
  isAdmin: boolean;
  password?: string;
  storeId: number;
}

export interface IStaffUpdate {
  id: number;
  name?: string;
  email?: string;
  position?: string;
  isAdmin?: boolean;
  password?: string;
  storeId?: number;
}

export interface IStaffDelete {
  id: number;
}

export interface IStaffGetFilter {
  id?: number;
  name?: string;
  email?: string;
  position?: string;
  isAdmin?: boolean;
  storeId?: number;
}

export interface IStaffGet {
  limit: number;
  page: number;
  filter?: IStaffGetFilter;
  sort?: IGetSort;
}
