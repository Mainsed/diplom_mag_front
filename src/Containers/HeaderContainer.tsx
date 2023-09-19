import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import Header from '../Components/Header/Header';
import { IHeaderProps } from '../Redux/interfaces/header.interface';
import { IState } from '../Redux/interfaces';

const HeaderContainer = (props: any) => {
  useEffect(() => {}, []);
  return <Header {...props} />;
};

const mapStateToProps = (state: IState): IHeaderProps => {
  return {
    isAuthorized: state.auth?.auth?.isAuthorized,
  };
};

export default connect(mapStateToProps, {})(HeaderContainer);
