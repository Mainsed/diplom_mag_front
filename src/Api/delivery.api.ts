import { AxiosError } from 'axios';
import {
  IDelivery,
  IDeliveryCreate,
  IDeliveryDelete,
  IDeliveryError,
  IDeliveryGet,
  IDeliveryState,
  IDeliveryUpdate,
} from '../Redux/interfaces';
import { instance } from './axios.instance';

export const DeliveryApi = {
  getAllDelivery: async (deliveryData: IDeliveryGet): Promise<IDeliveryState | IDeliveryError> => {
    if (deliveryData === undefined) {
      return [] as any;
    }

    try {
      const { filter, limit, page, sort } = deliveryData;
      return (
        await instance.get<IDeliveryState>(
          'delivery', {
            params: {
              limit,
              page,
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

  createDelivery: async (deliveryData: IDeliveryCreate): Promise<IDelivery | IDeliveryError> => {
    try {
      return (await instance.post('delivery', deliveryData)).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },

  updateDelivery: async (deliveryData: IDeliveryUpdate): Promise<IDelivery | IDeliveryError> => {
    try {
      return (await instance.put('delivery', deliveryData)).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },

  deleteDelivery: async (deliveryData: IDeliveryDelete): Promise<number | IDeliveryError> => {
    try {
      return (await instance.delete('delivery', { params: deliveryData })).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },
};
