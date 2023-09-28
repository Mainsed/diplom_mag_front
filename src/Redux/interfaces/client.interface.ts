import { IGetSort } from '../../utils/interfaces/get.sort.interface';

export enum ClothSizes {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

export interface IClient {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  size: ClothSizes;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  deletedBy: string;
}

export interface IClientState {
  client: IClient[];
  clientCount: number;
  clientError?: string;
}

export interface IClientError {
  error: string;
}

export interface IClientProps {
  client: IClientState;
  getClientThunk(clientGetData?: IClientGet): void;
  updateClientThunk(clientToUpdate: IClientUpdate): void;
  createClientThunk(clientToCreate: IClientCreate): void;
  deleteClientThunk(clientToDelete: IClientDelete): void;
}

export interface IClientCreate {
  name: string;
  email: string;
  phoneNumber: string;
  size: ClothSizes;
}

export interface IClientUpdate {
  id: number;
  name?: string;
  email?: string;
  phoneNumber?: string;
  size?: ClothSizes;
}

export interface IClientDelete {
  id: number;
}

export interface IClientGetFilter {
  id?: number;
  name?: string;
  email?: string;
  phoneNumber?: string;
  size?: ClothSizes;
}

export interface IClientGet {
  limit?: number;
  page?: number;
  filter?: IClientGetFilter;
  sort?: IGetSort
}
