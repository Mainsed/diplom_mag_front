import { connect } from 'react-redux';
import React from 'react';
import { IAppProps, IState } from '../Redux/interfaces';
import App from '../App';
import { clearAuthError, setAuthorized } from '../Redux/reducers/authReducer';
import { clearStaffError } from '../Redux/reducers/staffReducer';

const AppContainer = (props: any) => {
  return <App {...props} />;
};

const mapStateToProps = (state: IState): Partial<IAppProps> => {
  const stateErrors = [state.auth?.auth?.error, state.staff.staffError];

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
  clearAuthError,
  clearStaffError,
})(AppContainer);
