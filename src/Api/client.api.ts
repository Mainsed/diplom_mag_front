import {
  ClothSizes,
  IClient,
  IClientCreate,
  IClientDelete,
  IClientGet,
  IClientState,
  IClientUpdate,
} from '../Redux/interfaces';
import { EnumSort } from '../enums/enum.sort';
import { instance } from './axios.instance';

let client = [
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

export const ClientApi = {
  getAlClient: (clientData: IClientGet): Promise<IClientState> | IClientState => {
    const startIndex = (clientData?.page || 0) * (clientData?.limit || 10);

    let clientSorted = [] as IClient[];
    if (clientData?.sort?.orderBy) {
      type propType = keyof typeof client[0]
      const property = clientData.sort.orderBy as propType;
      clientSorted = client.sort((a, b) => {
        if (clientData.sort?.order === EnumSort.asc) {
          return a[property] > b[property] ? 1 : -1;
        } else {
          return a[property] < b[property] ? 1 : -1;
        }
      })
    }

    const resp = (clientSorted.length === client.length ? clientSorted : client)
      .slice(startIndex, startIndex + (clientData?.limit || 10));
    return { client: resp, clientCount: client.length };
  },

  createClient: (clientData: IClientCreate): Promise<IClient> | IClient => {
    const newClient = {
      ...clientData,
      createdAt: '',
      createdBy: '',
      deletedBy: '',
      id: client[client.length - 1].id + 1,
      updatedAt:
        'updatedAt',
      updatedBy: 'updatedBy',
    };

    client.push(newClient);
    return newClient;
  },

  updateClient: (clientData: IClientUpdate): Promise<IClient> | IClient => {
    const existingClient = client.find((client) => client.id === clientData.id);
    if (!existingClient) {
      throw Error('Client not found');
    }

    const updatedClient = {
      createdAt: existingClient.createdBy,
      createdBy: existingClient.createdBy,
      deletedBy: existingClient.deletedBy,
      email: clientData.email || existingClient.email,
      id: existingClient.id,
      name: clientData.name || existingClient.name,
      updatedAt: 'date',
      updatedBy: 'id',
      phoneNumber: clientData.phoneNumber || existingClient.phoneNumber,
      size: clientData.size || existingClient.size
    } as IClient;

    client = client.map((client) => {
      if (client.id === clientData.id) {
        client = updatedClient;
      }
      return client;
    })
    return updatedClient;
  },

  deleteClient: (clientData: IClientDelete): Promise<number> | number => {
    client = client.filter((client) => client.id !== clientData.id);
    return clientData.id;
  },
};
