import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import Footer from '../Components/Footer/Footer';

const FooterContainer = (props: any) => {
  useEffect(() => {}, []);
  return <Footer {...props} />;
};

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, {})(FooterContainer);
