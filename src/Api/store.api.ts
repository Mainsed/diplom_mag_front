import { instance } from './axios.instance';
import { IStore, IStoreCreate, IStoreDelete, IStoreGet, IStoreState, IStoreUpdate } from '../Redux/interfaces';
import { EnumSort } from '../utils/enums/enum.sort';

let store = [
  {
    id: 1,
    address: 'address',
    isActive: true,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 2,
    address: 'address',
    isActive: true,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 3,
    address: 'address',
    isActive: true,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 4,
    address: 'address',
    isActive: true,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 5,
    address: 'address',
    isActive: true,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 6,
    address: 'address',
    isActive: true,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 7,
    address: 'address',
    isActive: true,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 8,
    address: 'address',
    isActive: true,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 9,
    address: 'address',
    isActive: true,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 10,
    address: 'address',
    isActive: true,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 11,
    address: 'address',
    isActive: true,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 12,
    address: 'address',
    isActive: true,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
] as IStore[];

export const StoreApi = {
  getAllStore: (storeData: IStoreGet): Promise<IStoreState> | IStoreState => {
    const startIndex = (storeData?.page || 0) * (storeData?.limit || 10);

    let storeSorted = [] as IStore[];
    if (storeData?.sort?.orderBy) {
      type propType = keyof typeof store[0]
      const property = storeData.sort.orderBy as propType;
      storeSorted = store.sort((a, b) => {
        if (storeData.sort?.order === EnumSort.asc) {
          return a[property] > b[property] ? 1 : -1;
        } else {
          return a[property] < b[property] ? 1 : -1;
        }
      });
    }

    const resp = (storeSorted.length === store.length ? storeSorted : store)
      .slice(startIndex, startIndex + (storeData?.limit || 10));

    return { store: resp, storeCount: store.length };
  },

  createStore: (storeData: IStoreCreate): Promise<IStore> | IStore => {
    // throw Error('Not implemented');
    // return instance.post('store', storeData)
    const newStore = {
      ...storeData,
      createdAt: '',
      createdBy: '',
      deletedBy: '',
      id: store[store.length - 1].id + 1,
      updatedAt:
        'updatedAt',
      updatedBy: 'updatedBy',
    };

    store.push(newStore);
    return newStore;
  },

  updateStore: (storeData: IStoreUpdate): Promise<IStore> | IStore => {
    const existingStore = store.find((store) => store.id === storeData.id);
    if (!existingStore) {
      throw Error('Store not found');
    }

    const updatedStore = {
      createdAt: existingStore.createdBy,
      createdBy: existingStore.createdBy,
      deletedBy: existingStore.deletedBy,
      id: existingStore.id,
      updatedAt: 'date',
      updatedBy: 'id',
      address: storeData.address || existingStore.address,
      isActive: storeData.isActive !== undefined ? storeData.isActive : existingStore.isActive,
    } as IStore;

    store = store.map((store) => {
      if (store.id === storeData.id) {
        store = updatedStore;
      }
      return store;
    });
    return updatedStore;
  },

  deleteStore: (storeData: IStoreDelete): Promise<number> | number => {
    store = store.filter((store) => store.id !== storeData.id);
    return storeData.id;
  },
};
