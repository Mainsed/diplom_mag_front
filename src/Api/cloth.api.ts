import { AxiosError } from 'axios';
import {
  ICloth,
  IClothCreate,
  IClothDelete,
  IClothError,
  IClothGet,
  IClothSizeInShops,
  IClothState,
  IClothUpdate,
} from '../Redux/interfaces';
import { instance } from './axios.instance';

export const ClothApi = {
  getAllCloth: async (clothData: IClothGet): Promise<IClothState | IClothError> => {
    if (clothData === undefined) {
      return [] as any;
    }

    try {
      const { filter, limit, page, sort } = clothData;
      return (
        await instance.get<IClothState>(
          'cloth', {
            params: {
              limit,
              page,
              order: sort?.order,
              orderBy: sort?.orderBy,
              desc: filter?.desc,
              id: filter?.id,
              price: filter?.price,
              name: filter?.name,
            },
          }
        )
      ).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.message };
    }
  },

  getClothSizeCountByShop: async (clothId: number): Promise<IClothSizeInShops | IClothError> => {
    try {
      return (await instance.get(`cloth/${clothId}}`)).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },

  createCloth: async (clothData: IClothCreate): Promise<ICloth | IClothError> => {
    try {
      return (await instance.post('cloth', clothData)).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },

  updateCloth: async (clothData: IClothUpdate): Promise<ICloth | IClothError> => {
    try {
      return (await instance.put('cloth', clothData)).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },

  deleteCloth: async (clothData: IClothDelete): Promise<number | IClothError> => {
    try {
      return (await instance.delete('cloth', { params: clothData })).data;
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },
};
