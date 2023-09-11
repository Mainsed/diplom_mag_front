import {
  ClothSizes,
  ICloth,
  IClothCreate,
  IClothDelete,
  IClothGet,
  IClothSizeInShops,
  IClothState,
  IClothUpdate,
} from '../Redux/interfaces';
import { EnumSort } from '../utils/enums/enum.sort';
import { instance } from './axios.instance';

let cloth = [
  {
    id: 1,
    name: 'name',
    desc: 'desc',
    price: 100,
    availableSizes: [ClothSizes.XS, ClothSizes.S],
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 2,
    name: 'name',
    desc: 'desc',
    price: 100,
    availableSizes: [ClothSizes.XS, ClothSizes.S],
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 3,
    name: 'name',
    desc: 'desc',
    price: 100,
    availableSizes: [ClothSizes.XS, ClothSizes.S],
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 4,
    name: 'name',
    desc: 'desc',
    price: 100,
    availableSizes: [ClothSizes.XS, ClothSizes.S],
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 5,
    name: 'name',
    desc: 'desc',
    price: 100,
    availableSizes: [ClothSizes.XS, ClothSizes.S],
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 6,
    name: 'name',
    desc: 'desc',
    price: 100,
    availableSizes: [ClothSizes.XS, ClothSizes.S],
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 7,
    name: 'name',
    desc: 'desc',
    price: 100,
    availableSizes: [ClothSizes.XS, ClothSizes.S],
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 8,
    name: 'name',
    desc: 'desc',
    price: 100,
    availableSizes: [ClothSizes.XS, ClothSizes.S],
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 9,
    name: 'name',
    desc: 'desc',
    price: 100,
    availableSizes: [ClothSizes.XS, ClothSizes.S],
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 10,
    name: 'name',
    desc: 'desc',
    price: 100,
    availableSizes: [ClothSizes.XS, ClothSizes.S],
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 11,
    name: 'name',
    desc: 'desc',
    price: 100,
    availableSizes: [ClothSizes.XS, ClothSizes.S],
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 12,
    name: 'name',
    desc: 'desc',
    price: 100,
    availableSizes: [ClothSizes.XS, ClothSizes.S],
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
] as ICloth[];

export const ClothApi = {
  getAllCloth: (clothData: IClothGet): Promise<IClothState> | IClothState => {
    const startIndex = (clothData?.page || 0) * (clothData?.limit || 10);

    let clothSorted = [] as ICloth[];
    if (clothData?.sort?.orderBy) {
      type propType = keyof typeof cloth[0]
      const property = clothData.sort.orderBy as propType;
      clothSorted = cloth.sort((a, b) => {
        if (property === 'availableSizes') {
          return 1;
        }
        if (clothData.sort?.order === EnumSort.asc) {
          return a[property] > b[property] ? 1 : -1;
        } else {
          return a[property] < b[property] ? 1 : -1;
        }
      });
    }

    const resp = (clothSorted.length === cloth.length ? clothSorted : cloth)
      .slice(startIndex, startIndex + (clothData?.limit || 10));
    return { cloth: resp, clothCount: cloth.length };
  },

  getClothSizeCountByShop: (clothId: number): Promise<IClothSizeInShops> | IClothSizeInShops => {
    return {
      clothId,
      shops: [
        {
          shopId: 1,
          sizes: [
            { size: ClothSizes.XS, count: 50 },
            { size: ClothSizes.S, count: 25 },
            { size: ClothSizes.M, count: 30 },
            { size: ClothSizes.L, count: 20 },
          ],
        },
        {
          shopId: 2,
          sizes: [
            { size: ClothSizes.XS, count: 50 },
            { size: ClothSizes.S, count: 25 },
            { size: ClothSizes.M, count: 30 },
            { size: ClothSizes.L, count: 20 },
          ],
        },
        {
          shopId: 3,
          sizes: [
            { size: ClothSizes.XS, count: 50 },
            { size: ClothSizes.S, count: 25 },
            { size: ClothSizes.M, count: 30 },
            { size: ClothSizes.L, count: 20 },
          ],
        },
        {
          shopId: 4,
          sizes: [
            { size: ClothSizes.XS, count: 50 },
            { size: ClothSizes.S, count: 25 },
            { size: ClothSizes.M, count: 30 },
            { size: ClothSizes.L, count: 20 },
          ],
        },
      ],
    };
  },

  createCloth: (clothData: IClothCreate): Promise<ICloth> | ICloth => {
    const newCloth = {
      ...clothData,
      createdAt: '',
      createdBy: '',
      deletedBy: '',
      id: cloth[cloth.length - 1].id + 1,
      updatedAt:
        'updatedAt',
      updatedBy: 'updatedBy',
    };
    cloth.push(newCloth);
    return newCloth;
  },

  updateCloth: (clothData: IClothUpdate): Promise<ICloth> | ICloth => {
    const existingCloth = cloth.find((cloth) => cloth.id === clothData.id);
    if (!existingCloth) {
      throw Error('Cloth not found');
    }

    const updatedCloth = {
      createdAt: existingCloth.createdBy,
      createdBy: existingCloth.createdBy,
      deletedBy: existingCloth.deletedBy,
      id: existingCloth.id,
      name: clothData.name || existingCloth.name,
      desc: clothData.desc || existingCloth.desc,
      price: clothData.price || existingCloth.price,
      availableSizes: clothData.availableSizes || existingCloth.availableSizes,
      updatedAt: 'date',
      updatedBy: 'id',
    } as ICloth;

    cloth = cloth.map((cloth) => {
      if (cloth.id === clothData.id) {
        cloth = updatedCloth;
      }
      return cloth;
    });
    return updatedCloth;
  },

  deleteCloth: (clothData: IClothDelete): Promise<number> | number => {
    cloth = cloth.filter((cloth) => cloth.id !== clothData.id);
    return clothData.id;
  },
};
