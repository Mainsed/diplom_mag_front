import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { IAuthProps, IState } from '../Redux/interfaces';
import {
  authorizeThunk,
} from '../Redux/reducers/authReducer';
import Auth from '../Components/Auth/Auth';

const AuthContainer = (props: any) => {
  useEffect(() => {}, []);
  return <Auth {...props} />;
};

const mapStateToProps = (state: IState): Partial<IAuthProps> => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  authorizeThunk,
})(AuthContainer);
