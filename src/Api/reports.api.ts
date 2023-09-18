import {
  ClothSizes,
  IReports,
  IReportsState,
} from '../Redux/interfaces';
import { instance } from './axios.instance';

const reports = {
  clothesBySales: [
    { clothId: 1, numberOfSales: 100, change: 52 },
    { clothId: 2, numberOfSales: 100, change: 52 },
    { clothId: 3, numberOfSales: 100, change: -52 },
    { clothId: 4, numberOfSales: 100, change: 52 },
    { clothId: 5, numberOfSales: 100, change: -52 },
  ],
  halfYearIncome: {
    totalIncome: 100200,
    incomeByMonth: [
      { monthNumber: 5, income: 10000 },
      { monthNumber: 6, income: 10000 },
      { monthNumber: 7, income: 10000 },
      { monthNumber: 8, income: 20100 },
      { monthNumber: 9, income: 20100 },
      { monthNumber: 10, income: 30000 },
    ],
  },
  sizePopularity: [
    { size: ClothSizes.XS, numberOfSales: 100, change: 20 },
    { size: ClothSizes.S, numberOfSales: 100, change: -20 },
    { size: ClothSizes.M, numberOfSales: 100, change: -20 },
    { size: ClothSizes.L, numberOfSales: 100, change: 20 },
    { size: ClothSizes.XL, numberOfSales: 100, change: 20 },
  ],
  staffChanges: {
    totalStaffNumber: 130,
    staffChangesByMonth: [
      { firedStaffCount: 5, hiredStaffCount: 10, monthNumber: 5 },
      { firedStaffCount: 5, hiredStaffCount: 10, monthNumber: 6 },
      { firedStaffCount: 5, hiredStaffCount: 10, monthNumber: 7 },
      { firedStaffCount: 5, hiredStaffCount: 10, monthNumber: 8 },
      { firedStaffCount: 5, hiredStaffCount: 10, monthNumber: 9 },
    ],
  },
  storesBySales: [
    { storeId: 1, numberOfSales: 100, change: -40 },
    { storeId: 2, numberOfSales: 100, change: 40 },
    { storeId: 3, numberOfSales: 100, change: 40 },
    { storeId: 4, numberOfSales: 100, change: 40 },
    { storeId: 5, numberOfSales: 100, change: -40 },
  ],
} as IReports;

export const ReportsApi = {
  getReports: (): Promise<IReportsState> | IReportsState => {
    return { reports };
  },

};
