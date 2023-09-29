import { AxiosError } from 'axios';
import {
  IReportsError,
  IReportsState,
} from '../Redux/interfaces';
import { instance } from './axios.instance';

export const ReportsApi = {
  getReports: async (): Promise<IReportsState | IReportsError> => {
    try {
      return { reports: (await instance.get('report')).data };
    } catch (e) {
      const error = e as AxiosError<any>;
      return { error: error.response?.data?.response?.message?.toString() || error.response?.data?.message };
    }
  },

};
