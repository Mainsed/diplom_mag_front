import { IClientState } from './client.interface';
import { IClothState } from './cloth.interface';
import { IOrderState } from './order.interface';
import { IStaffState } from './staff.interface';

export interface IState {
  staff: IStaffState,
  client: IClientState,
  cloth: IClothState,
  order: IOrderState,
}
