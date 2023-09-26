import { AxiosError } from 'axios';
import {
  ClothSizes,
  IOrder,
  IOrderCreate,
  IOrderDelete,
  IOrderError,
  IOrderGet,
  IOrderState,
  IOrderUpdate,
  OrderStatuses,
} from '../Redux/interfaces';
import { EnumSort } from '../utils/enums/enum.sort';
import { instance } from './axios.instance';

export const OrderApi = {
  getAllOrder: async (orderData: IOrderGet): Promise<IOrderState | IOrderError> => {
    if (orderData === undefined) {
      return [] as any;
    }

    try {
      const { filter, limit, page, sort } = orderData;
      return (
        await instance.get<IOrderState>(
          'order', {
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

  createOrder: async (orderData: IOrderCreate): Promise<IOrder | IOrderError> => {
    try {
      return (await instance.post('order', orderData)).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },

  updateOrder: async (orderData: IOrderUpdate): Promise<IOrder | IOrderError> => {
    try {
      return (await instance.put('order', orderData)).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },

  deleteOrder: async (orderData: IOrderDelete): Promise<number | IOrderError> => {
    try {
      return (await instance.delete('order', { params: orderData })).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },
};
