import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import MainContent from '../Components/MainContent/MainContent';

const MainContentContainer = (props: any) => {
  useEffect(() => {}, []);
  return <MainContent {...props} />;
};

const mapStateToProps = () => {
  return {};
};
export default connect(mapStateToProps, {})(MainContentContainer);
