import { instance } from './axios.instance';
import { IStaff, IStaffCreate, IStaffDelete, IStaffGet, IStaffState, IStaffUpdate } from '../Redux/interfaces';
import { EnumSort } from '../enums/enum.sort';

let staff = [
  {
    id: 1,
    name: 'name',
    email: 'email',
    position: 'position',
    isAdmin: false,
    password: 'hash',
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
    position: 'position',
    isAdmin: true,
    password: 'hash',
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
    position: 'position',
    isAdmin: false,
    password: 'hash',
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
    position: 'position',
    isAdmin: false,
    password: 'hash',
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
    position: 'position',
    isAdmin: false,
    password: 'hash',
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
    position: 'position',
    isAdmin: false,
    password: 'hash',
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
    position: 'position',
    isAdmin: false,
    password: 'hash',
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
    position: 'position',
    isAdmin: false,
    password: 'hash',
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
    position: 'position',
    isAdmin: false,
    password: 'hash',
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
    position: 'position',
    isAdmin: false,
    password: 'hash',
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
    position: 'position',
    isAdmin: false,
    password: 'hash',
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
    position: 'position',
    isAdmin: false,
    password: 'hash',
    createdBy: 'id',
    createdAt: 'isodate',
    updatedBy: 'id',
    updatedAt: 'isodate',
    deletedBy: 'id',
  },
] as IStaff[];

export const StaffApi = {
  getAlStaff: (staffData: IStaffGet): Promise<IStaffState> | IStaffState => {
    const startIndex = (staffData?.page || 0) * (staffData?.limit || 10);

    let staffSorted = [] as IStaff[];
    if (staffData?.sort?.orderBy) {
      type propType = keyof typeof staff[0]
      const property = staffData.sort.orderBy as propType;
      staffSorted = staff.sort((a, b) => {
        if (staffData.sort?.order === EnumSort.asc) {
          return a[property] > b[property] ? 1 : -1;
        } else {
          return a[property] < b[property] ? 1 : -1;
        }
      });
    }

    const resp = (staffSorted.length === staff.length ? staffSorted : staff)
      .slice(startIndex, startIndex + (staffData?.limit || 10));

    return { staff: resp, staffCount: staff.length };
  },

  createStaff: (staffData: IStaffCreate): Promise<IStaff> | IStaff => {
    // throw Error('Not implemented');
    // return instance.post('staff', staffData)
    const newStaff = {
      ...staffData,
      password: staffData.password || '',
      createdAt: '',
      createdBy: '',
      deletedBy: '',
      id: staff[staff.length - 1].id + 1,
      updatedAt:
        'updatedAt',
      updatedBy: 'updatedBy',
    };

    staff.push(newStaff);
    return newStaff;
  },

  updateStaff: (staffData: IStaffUpdate): Promise<IStaff> | IStaff => {
    const existingStaff = staff.find((staff) => staff.id === staffData.id);
    if (!existingStaff) {
      throw Error('Staff not found');
    }

    const updatedStaff = {
      createdAt: existingStaff.createdBy,
      createdBy: existingStaff.createdBy,
      deletedBy: existingStaff.deletedBy,
      email: staffData.email || existingStaff.email,
      id: existingStaff.id,
      isAdmin: staffData.isAdmin !== undefined ? staffData.isAdmin : existingStaff.isAdmin,
      name: staffData.name || existingStaff.name,
      position: staffData.position || existingStaff.position,
      password: staffData.password || existingStaff.password,
      updatedAt: 'date',
      updatedBy: 'id',
    } as IStaff;

    staff = staff.map((staff) => {
      if (staff.id === staffData.id) {
        staff = updatedStaff;
      }
      return staff;
    })
    return updatedStaff;
  },

  deleteStaff: (staffData: IStaffDelete): Promise<number> | number => {
    staff = staff.filter((staff) => staff.id !== staffData.id);
    return staffData.id;
  },
};
