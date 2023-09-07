import { IClientState } from './client.interface';
import { IStaffState } from './staff.interface';

export interface IState {
  staff: IStaffState,
  client: IClientState,
}
