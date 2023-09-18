import { Dispatch } from 'redux';
import { IReportsState } from '../interfaces';
import { ReportsApi } from '../../Api/reports.api';

const initialState = {} as IReportsState;

const GET_REPORTS = 'GET_REPORTS';

export type ActionTypes = GetReportsActionType

const reportsReducer = (state = initialState, action: ActionTypes): IReportsState => {
  switch (action.type) {
    case GET_REPORTS: {
      return action.data;
    }

    default:
      return state;
  }
};

type GetReportsActionType = {
  type: typeof GET_REPORTS;
  data: IReportsState
}

// thunks
export const getReportsThunk = () => async (dispatch: Dispatch<ActionTypes>) => {
  const reportsResp = await ReportsApi.getReports();
  console.log(reportsResp);
  dispatch({ type: GET_REPORTS, data: reportsResp });
};

export default reportsReducer;
