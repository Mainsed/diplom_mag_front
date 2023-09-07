import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import Staff from '../Components/Staff/Staff';
import { IStaffProps, IState } from '../Redux/interfaces';
import {
  getStaffThunk,
  updateStaffThunk,
  createStaffThunk,
  deleteStaffThunk,
} from '../Redux/reducers/staffReducer';

const StaffContainer = (props: any) => {
  useEffect(() => {}, []);
  return <Staff {...props} />;
};

const mapStateToProps = (state: IState): Partial<IStaffProps> => {
  return {
    staff: state.staff,
  };
};

export default connect(mapStateToProps, {
  getStaffThunk,
  updateStaffThunk,
  createStaffThunk,
  deleteStaffThunk,
})(StaffContainer);
