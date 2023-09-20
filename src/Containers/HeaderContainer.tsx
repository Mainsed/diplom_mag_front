import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import Header from '../Components/Header/Header';
import { IHeaderProps } from '../Redux/interfaces/header.interface';
import { IState } from '../Redux/interfaces';
import { logoutThunk } from '../Redux/reducers/authReducer';

const HeaderContainer = (props: any) => {
  useEffect(() => {}, []);
  return <Header {...props} />;
};

const mapStateToProps = (state: IState): Partial<IHeaderProps> => {
  return {
    isAuthorized: state.auth?.auth?.isAuthorized,
    name: state.auth?.auth?.name,
  };
};

export default connect(mapStateToProps, { logoutThunk })(HeaderContainer);
