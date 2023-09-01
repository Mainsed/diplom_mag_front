import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import Header from '../Components/Header/Header';

const HeaderContainer = (props: any) => {
  useEffect(() => {}, []);
  return <Header {...props} />;
};

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, {})(HeaderContainer);
