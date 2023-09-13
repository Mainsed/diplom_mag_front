import {
  IOrder,
  IOrderCreate,
  IOrderDelete,
  IOrderGet,
  IOrderState,
  IOrderUpdate,
  OrderStatuses,
} from '../Redux/interfaces';
import { EnumSort } from '../utils/enums/enum.sort';
import { instance } from './axios.instance';

let order = [
  {
    id: 1,
    clientId: 'id',
    clothIdList: ['id'],
    status: OrderStatuses.DELIVERED,
    price: 100,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 2,
    clientId: 'id',
    clothIdList: ['id'],
    status: OrderStatuses.DELIVERED,
    price: 100,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 3,
    clientId: 'id',
    clothIdList: ['id'],
    status: OrderStatuses.DELIVERED,
    price: 100,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 4,
    clientId: 'id',
    clothIdList: ['id'],
    status: OrderStatuses.DELIVERED,
    price: 100,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 5,
    clientId: 'id',
    clothIdList: ['id'],
    status: OrderStatuses.DELIVERED,
    price: 100,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 6,
    clientId: 'id',
    clothIdList: ['id'],
    status: OrderStatuses.DELIVERED,
    price: 100,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 7,
    clientId: 'id',
    clothIdList: ['id'],
    status: OrderStatuses.DELIVERED,
    price: 100,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 8,
    clientId: 'id',
    clothIdList: ['id'],
    status: OrderStatuses.DELIVERED,
    price: 100,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 9,
    clientId: 'id',
    clothIdList: ['id'],
    status: OrderStatuses.DELIVERED,
    price: 100,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 10,
    clientId: 'id',
    clothIdList: ['id'],
    status: OrderStatuses.DELIVERED,
    price: 100,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 11,
    clientId: 'id',
    clothIdList: ['id'],
    status: OrderStatuses.DELIVERED,
    price: 100,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
  {
    id: 12,
    clientId: 'id',
    clothIdList: ['id'],
    status: OrderStatuses.DELIVERED,
    price: 100,
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
] as IOrder[];

export const OrderApi = {
  getAllOrder: (orderData: IOrderGet): Promise<IOrderState> | IOrderState => {
    const startIndex = (orderData?.page || 0) * (orderData?.limit || 10);

    let orderSorted = [] as IOrder[];
    if (orderData?.sort?.orderBy) {
      type propType = keyof typeof order[0]
      const property = orderData.sort.orderBy as propType;
      orderSorted = order.sort((a, b) => {
        if (property === 'clothIdList') {
          if (orderData.sort?.order === EnumSort.asc) {
            return a[property].length > b[property].length ? 1 : -1;
          } else {
            return a[property].length < b[property].length ? 1 : -1;
          }
        }
        if (orderData.sort?.order === EnumSort.asc) {
          return a[property] > b[property] ? 1 : -1;
        } else {
          return a[property] < b[property] ? 1 : -1;
        }
      });
    }

    const resp = (orderSorted.length === order.length ? orderSorted : order)
      .slice(startIndex, startIndex + (orderData?.limit || 10));
    return { order: resp, orderCount: order.length };
  },

  createOrder: (orderData: IOrderCreate): Promise<IOrder> | IOrder => {
    const newOrder = {
      ...orderData,
      status: orderData.status || OrderStatuses.DELIVERED,
      createdAt: '',
      createdBy: '',
      deletedBy: '',
      price: 100,
      id: order[order.length - 1].id + 1,
      updatedAt:
        'updatedAt',
      updatedBy: 'updatedBy',
    };

    order.push(newOrder);
    return newOrder;
  },

  updateOrder: (orderData: IOrderUpdate): Promise<IOrder> | IOrder => {
    const existingOrder = order.find((order) => order.id === orderData.id);
    if (!existingOrder) {
      throw Error('Order not found');
    }

    const updatedOrder = {
      createdAt: existingOrder.createdBy,
      createdBy: existingOrder.createdBy,
      deletedBy: existingOrder.deletedBy,
      clientId: orderData.clientId || existingOrder.clientId,
      clothIdList: orderData.clothIdList || existingOrder.clothIdList,
      status: orderData.status || existingOrder.status,
      price: existingOrder.price,
      id: existingOrder.id,
      updatedAt: 'date',
      updatedBy: 'id',
    } as IOrder;

    order = order.map((order) => {
      if (order.id === orderData.id) {
        order = updatedOrder;
      }
      return order;
    });
    return updatedOrder;
  },

  deleteOrder: (orderData: IOrderDelete): Promise<number> | number => {
    order = order.filter((order) => order.id !== orderData.id);
    return orderData.id;
  },
};
