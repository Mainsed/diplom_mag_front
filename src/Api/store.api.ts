import { instance } from './axios.instance';
import {
  IStore,
  IStoreCreate,
  IStoreDelete,
  IStoreError,
  IStoreGet,
  IStoreState,
  IStoreUpdate,
} from '../Redux/interfaces';
import { AxiosError } from 'axios';

export const StoreApi = {
  getAllStore: async (storeData: IStoreGet): Promise<IStoreState | IStoreError> => {
    if (storeData === undefined) {
      return [] as any;
    }

    try {
      const { filter, limit, page, sort } = storeData;
      return (
        await instance.get<IStoreState>(
          'store', {
            params: {
              limit: limit,
              page: page,
              order: sort?.order,
              orderBy: sort?.orderBy,
              ...filter,
            },
          }
        )
      ).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.message };
    }
  },

  createStore: async (storeData: IStoreCreate): Promise<IStore | IStoreError> => {
    try {
      return (await instance.post('store', storeData)).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },

  updateStore: async (storeData: IStoreUpdate): Promise<IStore | IStoreError> => {
    try {
      return (await instance.put('store', storeData)).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },

  deleteStore: async (storeData: IStoreDelete): Promise<number | IStoreError> => {
    try {
      return (await instance.delete('store', { params: storeData })).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },
};
