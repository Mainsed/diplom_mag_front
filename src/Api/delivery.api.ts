import {
  ClothSizes,
  DeliveryType,
  IDelivery,
  IDeliveryCreate,
  IDeliveryDelete,
  IDeliveryGet,
  IDeliveryState,
  IDeliveryUpdate,
} from '../Redux/interfaces';
import { EnumSort } from '../utils/enums/enum.sort';
import { instance } from './axios.instance';

let delivery = [
  {
    id: 1,
    clothDelivered: [
      {
        clothId: 1,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 2,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 3,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 4,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
    ],
    deliveredTo: 1,
    totalAmountDelivered: 120,
    typeOfDelivery: DeliveryType.EXTERNAL,
    price: 1200,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 2,
    clothDelivered: [
      {
        clothId: 1,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 2,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 3,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 4,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
    ],
    deliveredTo: 1,
    totalAmountDelivered: 120,
    typeOfDelivery: DeliveryType.EXTERNAL,
    price: 1200,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 3,
    clothDelivered: [
      {
        clothId: 1,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 2,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 3,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 4,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
    ],
    deliveredTo: 1,
    totalAmountDelivered: 120,
    typeOfDelivery: DeliveryType.EXTERNAL,
    price: 1200,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 4,
    clothDelivered: [
      {
        clothId: 1,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 2,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 3,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 4,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
    ],
    deliveredTo: 1,
    totalAmountDelivered: 120,
    typeOfDelivery: DeliveryType.EXTERNAL,
    price: 1200,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 5,
    clothDelivered: [
      {
        clothId: 1,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 2,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 3,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 4,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
    ],
    deliveredTo: 1,
    totalAmountDelivered: 120,
    typeOfDelivery: DeliveryType.EXTERNAL,
    price: 1200,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 6,
    clothDelivered: [
      {
        clothId: 1,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 2,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 3,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 4,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
    ],
    deliveredTo: 1,
    totalAmountDelivered: 120,
    typeOfDelivery: DeliveryType.EXTERNAL,
    price: 1200,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 7,
    clothDelivered: [
      {
        clothId: 1,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 2,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 3,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 4,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
    ],
    deliveredTo: 1,
    totalAmountDelivered: 120,
    typeOfDelivery: DeliveryType.EXTERNAL,
    price: 1200,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 8,
    clothDelivered: [
      {
        clothId: 1,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 2,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 3,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 4,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
    ],
    deliveredTo: 1,
    totalAmountDelivered: 120,
    typeOfDelivery: DeliveryType.EXTERNAL,
    price: 1200,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 9,
    clothDelivered: [
      {
        clothId: 1,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 2,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 3,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 4,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
    ],
    deliveredTo: 1,
    totalAmountDelivered: 120,
    typeOfDelivery: DeliveryType.EXTERNAL,
    price: 1200,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 10,
    clothDelivered: [
      {
        clothId: 1,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 2,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 3,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 4,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
    ],
    deliveredTo: 1,
    totalAmountDelivered: 120,
    typeOfDelivery: DeliveryType.EXTERNAL,
    price: 1200,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 11,
    clothDelivered: [
      {
        clothId: 1,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 2,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 3,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 4,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
    ],
    deliveredTo: 1,
    totalAmountDelivered: 120,
    typeOfDelivery: DeliveryType.EXTERNAL,
    price: 1200,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 12,
    clothDelivered: [
      {
        clothId: 1,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 2,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 3,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
      {
        clothId: 4,
        sizes: [
          { size: ClothSizes.L, count: 10 },
          { size: ClothSizes.XL, count: 10 },
          { size: ClothSizes.S, count: 10 },
        ],
      },
    ],
    deliveredTo: 1,
    totalAmountDelivered: 120,
    typeOfDelivery: DeliveryType.EXTERNAL,
    price: 1200,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
] as IDelivery[];

export const DeliveryApi = {
  getAllDelivery: (deliveryData: IDeliveryGet): Promise<IDeliveryState> | IDeliveryState => {
    const startIndex = (deliveryData?.page || 0) * (deliveryData?.limit || 10);

    let deliverySorted = [] as IDelivery[];
    if (deliveryData?.sort?.orderBy) {
      type propType = keyof typeof delivery[0]
      const property = deliveryData.sort.orderBy as propType;
      deliverySorted = delivery.sort((a, b) => {
        if (property === 'clothDelivered' || property === 'price') {
          return 1;
        }
        if (deliveryData.sort?.order === EnumSort.asc) {
          return (a[property] || 0) > (b[property] || 0) ? 1 : -1;
        } else {
          return (a[property] || 0) < (b[property] || 0) ? 1 : -1;
        }
      });
    }

    const resp = (deliverySorted.length === delivery.length ? deliverySorted : delivery)
      .slice(startIndex, startIndex + (deliveryData?.limit || 10));
    return { delivery: resp, deliveryCount: delivery.length };
  },

  createDelivery: (deliveryData: IDeliveryCreate): Promise<IDelivery> | IDelivery => {
    const newDelivery = {
      ...deliveryData,
      createdAt: '',
      createdBy: '',
      deletedBy: '',
      id: delivery[delivery.length - 1].id + 1,
      totalAmountDelivered: 120,
      updatedAt:
        'updatedAt',
      updatedBy: 'updatedBy',
    };
    delivery.push(newDelivery);
    return newDelivery;
  },

  updateDelivery: (deliveryData: IDeliveryUpdate): Promise<IDelivery> | IDelivery => {
    const existingDelivery = delivery.find((delivery) => delivery.id === deliveryData.id);
    if (!existingDelivery) {
      throw Error('Delivery not found');
    }

    const updatedDelivery = {
      createdAt: existingDelivery.createdBy,
      createdBy: existingDelivery.createdBy,
      deletedBy: existingDelivery.deletedBy,
      id: existingDelivery.id,
      price: deliveryData.price || existingDelivery.price,
      clothDelivered: deliveryData.clothDelivered || existingDelivery.clothDelivered,
      deliveredTo: deliveryData.deliveredTo || existingDelivery.deliveredTo,
      deliveredFrom: deliveryData.deliveredFrom || existingDelivery.deliveredFrom,
      typeOfDelivery: existingDelivery.typeOfDelivery,
      totalAmountDelivered: existingDelivery.totalAmountDelivered,
      updatedAt: 'date',
      updatedBy: 'id',
    } as IDelivery;

    delivery = delivery.map((delivery) => {
      if (delivery.id === deliveryData.id) {
        delivery = updatedDelivery;
      }
      return delivery;
    });
    return updatedDelivery;
  },

  deleteDelivery: (deliveryData: IDeliveryDelete): Promise<number> | number => {
    delivery = delivery.filter((delivery) => delivery.id !== deliveryData.id);
    return deliveryData.id;
  },
};
