import { instance } from './axios.instance';
import { IStaff, IStaffCreate, IStaffDelete, IStaffGet, IStaffState, IStaffUpdate } from '../Redux/interfaces';

export const StaffApi = {
  getAlStaff: (staffData: IStaffGet): Promise<IStaffState> | IStaffState => {
    // throw Error('Not implemented');
    // return instance.get('')
    const staff = [
      {
        id: 1,
        name: 'name',
        email: 'email',
        position: 'position',
        isAdmin: false,
        password: 'hash',
        createdBy: 'id',
        createdAt: 'isodate',
        updatedBy: 'id',
        updatedAt: 'isodate',
        deletedBy: 'id',
      },
      {
        id: 2,
        name: 'name',
        email: 'email',
        position: 'position',
        isAdmin: true,
        password: 'hash',
        createdBy: 'id',
        createdAt: 'isodate',
        updatedBy: 'id',
        updatedAt: 'isodate',
        deletedBy: 'id',
      },
      {
        id: 3,
        name: 'name',
        email: 'email',
        position: 'position',
        isAdmin: false,
        password: 'hash',
        createdBy: 'id',
        createdAt: 'isodate',
        updatedBy: 'id',
        updatedAt: 'isodate',
        deletedBy: 'id',
      },
      {
        id: 4,
        name: 'name',
        email: 'email',
        position: 'position',
        isAdmin: false,
        password: 'hash',
        createdBy: 'id',
        createdAt: 'isodate',
        updatedBy: 'id',
        updatedAt: 'isodate',
        deletedBy: 'id',
      },
      {
        id: 5,
        name: 'name',
        email: 'email',
        position: 'position',
        isAdmin: false,
        password: 'hash',
        createdBy: 'id',
        createdAt: 'isodate',
        updatedBy: 'id',
        updatedAt: 'isodate',
        deletedBy: 'id',
      },
      {
        id: 6,
        name: 'name',
        email: 'email',
        position: 'position',
        isAdmin: false,
        password: 'hash',
        createdBy: 'id',
        createdAt: 'isodate',
        updatedBy: 'id',
        updatedAt: 'isodate',
        deletedBy: 'id',
      },
      {
        id: 7,
        name: 'name',
        email: 'email',
        position: 'position',
        isAdmin: false,
        password: 'hash',
        createdBy: 'id',
        createdAt: 'isodate',
        updatedBy: 'id',
        updatedAt: 'isodate',
        deletedBy: 'id',
      },
      {
        id: 8,
        name: 'name',
        email: 'email',
        position: 'position',
        isAdmin: false,
        password: 'hash',
        createdBy: 'id',
        createdAt: 'isodate',
        updatedBy: 'id',
        updatedAt: 'isodate',
        deletedBy: 'id',
      },
      {
        id: 9,
        name: 'name',
        email: 'email',
        position: 'position',
        isAdmin: false,
        password: 'hash',
        createdBy: 'id',
        createdAt: 'isodate',
        updatedBy: 'id',
        updatedAt: 'isodate',
        deletedBy: 'id',
      },
      {
        id: 10,
        name: 'name',
        email: 'email',
        position: 'position',
        isAdmin: false,
        password: 'hash',
        createdBy: 'id',
        createdAt: 'isodate',
        updatedBy: 'id',
        updatedAt: 'isodate',
        deletedBy: 'id',
      },
      {
        id: 11,
        name: 'name',
        email: 'email',
        position: 'position',
        isAdmin: false,
        password: 'hash',
        createdBy: 'id',
        createdAt: 'isodate',
        updatedBy: 'id',
        updatedAt: 'isodate',
        deletedBy: 'id',
      },
      {
        id: 12,
        name: 'name',
        email: 'email',
        position: 'position',
        isAdmin: false,
        password: 'hash',
        createdBy: 'id',
        createdAt: 'isodate',
        updatedBy: 'id',
        updatedAt: 'isodate',
        deletedBy: 'id',
      },
    ] as IStaff[];

    const startIndex = (staffData?.page || 0) * (staffData?.limit || 10)
    const resp = staff.slice(startIndex, startIndex + (staffData?.limit || 10));
    return { staff: resp, staffCount: 12 };
  },

  createStaff: (staffData: IStaffCreate): Promise<IStaff> | IStaff => {
    // throw Error('Not implemented');
    // return instance.post('staff', staffData)
    return {
      ...staffData,
      password: staffData.password || '',
      createdAt: '',
      createdBy: '',
      deletedBy: '',
      id: 5,
      updatedAt:
        'updatedAt',
      updatedBy: 'updatedBy',
    };
  },

  updateStaff: (staffData: IStaffUpdate): Promise<IStaff> | IStaff => {
    throw Error('Not implemented');
    return instance.put('staff', staffData)
  },

  deleteStaff: (staffData: IStaffDelete): Promise<number> | number => {
    // throw Error('Not implemented');
    // return instance.delete(`staff/${staffData.id}}`)
    return staffData.id;
  }
}
