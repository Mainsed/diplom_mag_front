import { IGetSort } from '../../utils/interfaces/get.sort.interface';

export interface IStore {
  id: number;
  address: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  deletedBy: string;
}

export interface IStoreState {
  store: IStore[],
  storeCount: number,
}

export interface IStoreProps {
  store: IStoreState,
  getStoreThunk(storeGetData?: IStoreGet): void,
  updateStoreThunk(storeToUpdate: IStoreUpdate): void,
  createStoreThunk(storeToCreate: IStoreCreate): void,
  deleteStoreThunk(storeToDelete: IStoreDelete): void,
}

export interface IStoreCreate {
  address: string;
  isActive: boolean;
}

export interface IStoreUpdate {
  id: number;
  address?: string;
  isActive?: boolean;
}

export interface IStoreDelete {
  id: number;
}

export interface IStoreGetFilter {
  id?: number;
  address?: string;
  isActive?: boolean;
}

export interface IStoreGet {
  limit?: number;
  page?: number;
  filter?: IStoreGetFilter,
  sort?: IGetSort
}
