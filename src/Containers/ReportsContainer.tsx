import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { IReportsProps, IState } from '../Redux/interfaces';
import {
  getReportsThunk,
} from '../Redux/reducers/reportsReducer';
import Reports from '../Components/Reports/Reports';

const ReportsContainer = (props: any) => {
  useEffect(() => {}, []);
  return <Reports {...props} />;
};

const mapStateToProps = (state: IState): Partial<IReportsProps> => {
  return {
    reports: state.reports,
  };
};

export default connect(mapStateToProps, {
  getReportsThunk,
})(ReportsContainer);
