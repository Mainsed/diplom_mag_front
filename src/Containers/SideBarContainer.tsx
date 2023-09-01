import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import SideBar from '../Components/SideBar/SideBar';

const SideBarContainer = (props: any) => {
  useEffect(() => {}, []);
  return <SideBar {...props} />;
};

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, {})(SideBarContainer);
