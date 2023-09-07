import {
  ClothSizes,
  IClient,
  IClientCreate,
  IClientDelete,
  IClientGet,
  IClientState,
  IClientUpdate,
} from '../Redux/interfaces';
import { instance } from './axios.instance';

export const ClientApi = {
  getAlClient: (clientData: IClientGet): Promise<IClientState> | IClientState => {
    // throw Error('Not implemented');
    // return instance.get('')
    const client = [
      {
        id: 1,
        name: 'name',
        email: 'email',
        phoneNumber: 'phone',
        size: ClothSizes.S,
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
        phoneNumber: 'phone',
        size: ClothSizes.S,
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
        phoneNumber: 'phone',
        size: ClothSizes.S,
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
        phoneNumber: 'phone',
        size: ClothSizes.S,
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
        phoneNumber: 'phone',
        size: ClothSizes.S,
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
        phoneNumber: 'phone',
        size: ClothSizes.S,
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
        phoneNumber: 'phone',
        size: ClothSizes.S,
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
        phoneNumber: 'phone',
        size: ClothSizes.S,
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
        phoneNumber: 'phone',
        size: ClothSizes.S,
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
        phoneNumber: 'phone',
        size: ClothSizes.S,
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
        phoneNumber: 'phone',
        size: ClothSizes.S,
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
        phoneNumber: 'phone',
        size: ClothSizes.S,
        createdBy: 'id',
        createdAt: 'isodate',
        updatedBy: 'id',
        updatedAt: 'isodate',
        deletedBy: 'id',
      },
    ] as IClient[];

    const startIndex = (clientData?.page || 0) * (clientData?.limit || 10);
    const resp = client.slice(startIndex, startIndex + (clientData?.limit || 10));
    return { client: resp, clientCount: 12 };
  },

  createClient: (clientData: IClientCreate): Promise<IClient> | IClient => {
    // throw Error('Not implemented');
    // return instance.post('client', clientData)
    return {
      ...clientData,
      createdAt: '',
      createdBy: '',
      deletedBy: '',
      id: 5,
      updatedAt:
        'updatedAt',
      updatedBy: 'updatedBy',
    };
  },

  updateClient: (clientData: IClientUpdate): Promise<IClient> | IClient => {
    throw Error('Not implemented');
    return instance.put('client', clientData);
  },

  deleteClient: (clientData: IClientDelete): Promise<number> | number => {
    // throw Error('Not implemented');
    // return instance.delete(`client/${clientData.id}}`)
    return clientData.id;
  },
};
