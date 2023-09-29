import { ClothSizes } from './client.interface';

export interface IStoreBySales {
  storeId: number;
  numberOfSales: number;
  change: number;
}

export interface IClothBySales {
  clothId: number;
  numberOfSales: number;
  change: number;
}

export interface IIncomeByMonth {
  income: number;
  monthNumber: number;
}

export interface IHalfYearIncome {
  totalIncome: number;
  incomeByMonth: IIncomeByMonth[];
}

export interface IStaffChangesByMonth {
  firedStaffCount: number;
  hiredStaffCount: number;
  monthNumber: number;
}

export interface IStaffChanges {
  staffChangesByMonth: IStaffChangesByMonth[];
  totalStaffNumber: number;
}

export interface ISizesPopularityByMonth {
  size: ClothSizes;
  numberOfSales: number;
  change: number;
}

export interface IReports {
  storesBySales: IStoreBySales[];
  clothesBySales: IClothBySales[];
  halfYearIncome: IHalfYearIncome;
  staffChanges: IStaffChanges;
  sizePopularity: ISizesPopularityByMonth[];
}

export interface IReportsState {
  reports: IReports;
  reportsError?: string;
}

export interface IReportsError {
  error: string;
}

export interface IReportsProps {
  reports: IReportsState;
  getReportsThunk(): void;
}
