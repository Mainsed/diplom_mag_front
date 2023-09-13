import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { IOrderProps, IState } from '../Redux/interfaces';
import {
  getOrderThunk,
  updateOrderThunk,
  createOrderThunk,
  deleteOrderThunk,
} from '../Redux/reducers/orderReducer';
import Order from '../Components/Order/Order';

const OrderContainer = (props: any) => {
  useEffect(() => {}, []);
  return <Order {...props} />;
};

const mapStateToProps = (state: IState): Partial<IOrderProps> => {
  return {
    order: state.order,
  };
};

export default connect(mapStateToProps, {
  getOrderThunk,
  updateOrderThunk,
  createOrderThunk,
  deleteOrderThunk,
})(OrderContainer);
