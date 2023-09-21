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

export const StaffApi = {
  getAllStaff: async (staffData: IStaffGet): Promise<IStaffState | IStaffError> => {
    if (staffData === undefined) {
      return [] as any;
    }

    try {
      const { filter, limit, page, sort } = staffData;
      return (
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
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.message };
    }
  },

  createStaff: async (staffData: IStaffCreate): Promise<IStaff | IStaffError> => {
    try {
      return (await instance.post('staff', staffData)).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },

  updateStaff: async (staffData: IStaffUpdate): Promise<IStaff | IStaffError> => {
    try {
      return (await instance.put('staff', staffData)).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },

  deleteStaff: async (staffData: IStaffDelete): Promise<number | IStaffError> => {
    try {
      return (await instance.delete('staff', { params: staffData })).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },
};
