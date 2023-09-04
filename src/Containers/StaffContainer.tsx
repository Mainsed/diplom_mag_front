import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import Staff from '../Components/Staff/Staff';
import { IStaffProps } from './state.interfaces';
import { IState } from '../Redux/interfaces';

const StaffContainer = (props: any) => {
  useEffect(() => {}, []);
  return <Staff {...props} />;
};

const mapStateToProps = (state: IState): IStaffProps => {
  return {
    staff: state.general.staff,
  };
};

export default connect(mapStateToProps, {})(StaffContainer);
