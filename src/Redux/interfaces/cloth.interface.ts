import { IGetSort } from '../../utils/interfaces/get.sort.interface';
import { ClothSizes } from './client.interface';

interface IClothSizeCount {
  size: ClothSizes;
  count: number;
}

export interface IClothSizeInShop {
  sizes: IClothSizeCount[];
  shopId: number;
}

export interface IClothSizeInShops {
  shops: IClothSizeInShop[];
  clothId: number;
}

export interface ICloth {
  id: number;
  name: string;
  desc: string;
  price: number;
  availableSizes: ClothSizes[];
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  deletedBy: string;
}

export interface IClothState {
  cloth: ICloth[];
  clothCount: number;
  sizesByShop?: IClothSizeInShops[];
}

export interface IClothProps {
  cloth: IClothState,
  getClothThunk(clothGetData?: IClothGet): void,
  updateClothThunk(clothToUpdate: IClothUpdate): void,
  createClothThunk(clothToCreate: IClothCreate): void,
  deleteClothThunk(clothToDelete: IClothDelete): void,
  getClothSizesThunk(clothId: number): void
}

export interface IClothCreate {
  desc: string;
  name: string;
  price: number;
  availableSizes: ClothSizes[];
}

export interface IClothUpdate {
  id: number;
  name?: string;
  desc?: string;
  price?: number;
  availableSizes?: ClothSizes[];
}

export interface IClothDelete {
  id: number;
}

export interface IClothGetFilter {
  id?: number;
  name?: string;
  desc?: string;
  price?: number;
  availableSizes?: ClothSizes[];
}

export interface IClothGet {
  limit?: number;
  page?: number;
  filter?: IClothGetFilter,
  sort?: IGetSort,
}
