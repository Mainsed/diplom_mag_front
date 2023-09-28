import { IAuthState } from './auth.interface';
import { IClientState } from './client.interface';
import { IClothState } from './cloth.interface';
import { IDeliveryState } from './delivery.interface';
import { IOrderState } from './order.interface';
import { IReportsState } from './reports.interface';
import { IStaffState } from './staff.interface';
import { IStoreState } from './store.interface';

export interface IState {
  staff: IStaffState;
  client: IClientState;
  cloth: IClothState;
  order: IOrderState;
  store: IStoreState;
  delivery: IDeliveryState;
  reports: IReportsState;
  auth: IAuthState;
}
