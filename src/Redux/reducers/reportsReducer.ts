import { Dispatch } from 'redux';
import { IReportsState } from '../interfaces';
import { ReportsApi } from '../../Api/reports.api';

const initialState = {} as IReportsState;

const CLEAR_ERROR = 'CLEAR_ERROR',
  GET_REPORTS = 'GET_REPORTS',
  SET_REPORTS_ERROR = 'SET_REPORTS_ERROR';

export type ActionTypes = GetReportsActionType | SetErrorActionType |ClearErrorActionType

const reportsReducer = (state = initialState, action: ActionTypes): IReportsState => {
  switch (action.type) {
    case GET_REPORTS: {
      return action.data;
    }

    case CLEAR_ERROR: {
      if (state.reportsError === undefined) {
        return state;
      }
      return { ...state, reportsError: undefined };
    }

    case SET_REPORTS_ERROR: {
      return { ...state, reportsError: action.data };
    }
    default:
      return state;
  }
};

type GetReportsActionType = {
  type: typeof GET_REPORTS;
  data: IReportsState
}

type SetErrorActionType = {
  type: typeof SET_REPORTS_ERROR;
  data: string;
}

type ClearErrorActionType = {
  type: typeof CLEAR_ERROR;
  data: undefined;
}
// thunks
export const getReportsThunk = () => async (dispatch: Dispatch<ActionTypes>) => {
  const reportsResp = await ReportsApi.getReports();

  if ('error' in reportsResp) {
    dispatch({ type: SET_REPORTS_ERROR, data: reportsResp.error });
    return;
  }

  dispatch({ type: GET_REPORTS, data: reportsResp });
};

export default reportsReducer;
