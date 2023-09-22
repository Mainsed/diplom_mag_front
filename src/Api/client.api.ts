import { AxiosError } from 'axios';
import {
  IClient,
  IClientCreate,
  IClientDelete,
  IClientError,
  IClientGet,
  IClientState,
  IClientUpdate,
} from '../Redux/interfaces';
import { instance } from './axios.instance';

export const ClientApi = {
  getAllClient: async (clientData: IClientGet): Promise<IClientState | IClientError> => {
    if (clientData === undefined) {
      return [] as any;
    }

    try {
      const { filter, limit, page, sort } = clientData;
      return (
        await instance.get<IClientState>(
          'client', {
            params: {
              limit,
              page,
              order: sort?.order,
              orderBy: sort?.orderBy,
              email: filter?.email,
              id: filter?.id,
              phoneNumber: filter?.phoneNumber,
              name: filter?.name,
              size: filter?.size,
            },
          }
        )
      ).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.message };
    }
  },

  createClient: async (clientData: IClientCreate): Promise<IClient | IClientError> => {
    try {
      return (await instance.post('client', clientData)).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },

  updateClient: async (clientData: IClientUpdate): Promise<IClient | IClientError> => {
    try {
      return (await instance.put('client', clientData)).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },

  deleteClient: async (clientData: IClientDelete): Promise<number | IClientError> => {
    try {
      return (await instance.delete('client', { params: clientData })).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },
};
