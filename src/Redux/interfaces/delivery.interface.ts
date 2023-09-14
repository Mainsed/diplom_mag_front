import { IGetSort } from '../../utils/interfaces/get.sort.interface';
import { ClothSizes } from './client.interface';

export enum DeliveryType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL'
}

export interface IDeliverySizeCount {
  size: ClothSizes;
  count: number;
}

export interface IClothDelivered {
  sizes: IDeliverySizeCount[];
  clothId: number;
}

export interface IDelivery {
  id: number;
  deliveredTo: number,
  deliveredFrom?: number,
  totalAmountDelivered: number,
  typeOfDelivery: DeliveryType,
  price?: number,
  clothDelivered: IClothDelivered[];
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  deletedBy: string;
}

export interface IDeliveryState {
  delivery: IDelivery[];
  deliveryCount: number;
}

export interface IDeliveryProps {
  delivery: IDeliveryState,
  getDeliveryThunk(deliveryGetData?: IDeliveryGet): void,
  updateDeliveryThunk(deliveryToUpdate: IDeliveryUpdate): void,
  createDeliveryThunk(deliveryToCreate: IDeliveryCreate): void,
  deleteDeliveryThunk(deliveryToDelete: IDeliveryDelete): void,
  getDeliverySizesThunk(deliveryId: number): void
}

export interface IDeliveryCreate {
  deliveredTo: number,
  deliveredFrom?: number,
  typeOfDelivery: DeliveryType,
  price?: number,
  clothDelivered: IClothDelivered[];
}

export interface IDeliveryUpdate {
  id: number;
  deliveredTo?: number,
  deliveredFrom?: number,
  price?: number,
  clothDelivered?: IClothDelivered[];
}

export interface IDeliveryDelete {
  id: number;
}

export interface IDeliveryGetFilter {
  id?: number;
  deliveredTo?: number,
  deliveredFrom?: number,
}

export interface IDeliveryGet {
  limit?: number;
  page?: number;
  filter?: IDeliveryGetFilter,
  sort?: IGetSort,
}
