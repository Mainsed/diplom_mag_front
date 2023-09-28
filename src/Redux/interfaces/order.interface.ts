import { IGetSort } from '../../utils/interfaces/get.sort.interface';
import { ClothSizes } from './client.interface';

export enum OrderStatuses {
  CREATED = 'CREATED',
  PROCESSING = 'PROCESSING',
  PAYED = 'PAYED',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  RETURNED = 'RETURNED',
  CANCELED = 'CANCELED',
}

export interface IClothId {
  clothId: number;
  amount: number;
  size: ClothSizes;
}

export interface IOrder {
  id: number;
  clientId: string;
  clothIdList: IClothId[];
  status: OrderStatuses;
  price: number;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  deletedBy: string;
}

export interface IOrderState {
  order: IOrder[];
  orderCount: number;
  orderError?: string;
}

export interface IOrderError {
  error: string;
}

export interface IOrderProps {
  order: IOrderState;
  getOrderThunk(orderGetData?: IOrderGet): void;
  updateOrderThunk(orderToUpdate: IOrderUpdate): void;
  createOrderThunk(orderToCreate: IOrderCreate): void;
  deleteOrderThunk(orderToDelete: IOrderDelete): void;
}

export interface IOrderCreate {
  clientId: string;
  clothIdList: IClothId[];
  status?: OrderStatuses;
}

export interface IOrderUpdate {
  id: number;
  clientId?: string;
  clothIdList?: IClothId[];
  status?: OrderStatuses;
}

export interface IOrderDelete {
  id: number;
}

export interface IOrderGetFilter {
  id?: number;
  clientId?: string;
  status?: OrderStatuses;
}

export interface IOrderGet {
  limit?: number;
  page?: number;
  filter?: IOrderGetFilter;
  sort?: IGetSort
}
