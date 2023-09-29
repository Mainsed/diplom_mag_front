import { connect } from 'react-redux';
import React from 'react';
import { IAppProps, IState } from '../Redux/interfaces';
import App from '../App';
import { clearError, setAuthorized } from '../Redux/reducers/authReducer';

const AppContainer = (props: any) => {
  return <App {...props} />;
};

const mapStateToProps = (state: IState): Partial<IAppProps> => {
  const stateErrors = [
    state.auth?.auth?.error,
    state.staff.staffError,
    state.client.clientError,
    state.cloth.clothError,
    state.order.orderError,
    state.store.storeError,
    state.delivery.deliveryError,
    state.reports.reportsError,
  ];

  const errors = stateErrors.filter(
    (error) => typeof error === 'string'
  ) as string[];

  return {
    auth: state.auth?.auth,
    errors,
  };
};

export default connect(mapStateToProps, {
  setAuthorized,
  clearError,
})(AppContainer);
