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

export interface IStateGeneral {
  staff: IStaff[]
}

export interface IState {
  general: IStateGeneral
}
