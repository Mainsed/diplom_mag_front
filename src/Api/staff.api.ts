import { instance } from './axios.instance';
import {
  IStaff,
  IStaffCreate,
  IStaffDelete,
  IStaffError,
  IStaffGet,
  IStaffState,
  IStaffUpdate,
} from '../Redux/interfaces';
import { AxiosError } from 'axios';

let staff = [
  {
    id: 1,
    name: 'name',
    email: 'email',
    position: 'position',
    isAdmin: false,
    password: 'hash',
    storeId: 1,
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
    storeId: 1,
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
    storeId: 1,
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
    storeId: 1,
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
    storeId: 1,
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
    storeId: 1,
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
    storeId: 1,
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
    storeId: 1,
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
    storeId: 1,
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
    storeId: 1,
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
    storeId: 1,
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
    storeId: 1,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
] as IStaff[];

export const StaffApi = {
  getAllStaff: async (staffData: IStaffGet): Promise<IStaffState | IStaffError> => {
    if (staffData === undefined) {
      return [] as any;
    }

    try {
      const { filter, limit, page, sort } = staffData;
      const staff = (
        await instance.get<IStaffState>(
          'staff', {
            params: {
              limit: limit,
              page: page,
              order: sort?.order,
              orderBy: sort?.orderBy,
              email: filter?.email,
              id: filter?.id,
              isAdmin: filter?.isAdmin,
              name: filter?.name,
              position: filter?.position,
              storeId: filter?.storeId,
            },
          }
        )
      ).data;
      return staff;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.message };
    }
  },

  createStaff: async (staffData: IStaffCreate): Promise<IStaff | IStaffError> => {
    try {
      const newStaff = (await instance.post('staff', staffData)).data;

      staff.push(newStaff);
      return newStaff;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },

  updateStaff: (staffData: IStaffUpdate): Promise<IStaff | IStaffError> | IStaff => {
    const existingStaff = staff.find((staff) => staff.id === staffData.id);
    if (!existingStaff) {
      throw Error('Staff not found');
    }

    const updatedStaff = {
      createdAt: existingStaff.createdBy,
      createdBy: existingStaff.createdBy,
      deletedBy: existingStaff.deletedBy,
      email: staffData.email || existingStaff.email,
      id: existingStaff.id,
      isAdmin: staffData.isAdmin !== undefined ? staffData.isAdmin : existingStaff.isAdmin,
      name: staffData.name || existingStaff.name,
      position: staffData.position || existingStaff.position,
      password: staffData.password || existingStaff.password,
      storeId: staffData.storeId || existingStaff.storeId,
      updatedAt: 'date',
      updatedBy: 'id',
    } as IStaff;

    staff = staff.map((staff) => {
      if (staff.id === staffData.id) {
        staff = updatedStaff;
      }
      return staff;
    });
    return updatedStaff;
  },

  deleteStaff: (staffData: IStaffDelete): Promise<number | IStaffError> | number => {
    staff = staff.filter((staff) => staff.id !== staffData.id);
    return staffData.id;
  },
};
