import { connect } from 'react-redux';
import React from 'react';
import { IAppProps, IState } from '../Redux/interfaces';
import App from '../App';
import { setAuthorized } from '../Redux/reducers/authReducer';

const AppContainer = (props: any) => {
  return <App {...props} />;
};

const mapStateToProps = (state: IState): Partial<IAppProps> => {
  return {
    auth: state.auth?.auth,
  };
};

export default connect(mapStateToProps, { setAuthorized })(AppContainer);
