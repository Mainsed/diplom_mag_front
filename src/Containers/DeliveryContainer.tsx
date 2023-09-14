import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { IDeliveryProps, IState } from '../Redux/interfaces';
import {
  getDeliveryThunk,
  updateDeliveryThunk,
  createDeliveryThunk,
  deleteDeliveryThunk,
} from '../Redux/reducers/deliveryReducer';
import Delivery from '../Components/Delivery/Delivery';

const DeliveryContainer = (props: any) => {
  useEffect(() => {}, []);
  return <Delivery {...props} />;
};

const mapStateToProps = (state: IState): Partial<IDeliveryProps> => {
  return {
    delivery: state.delivery,
  };
};

export default connect(mapStateToProps, {
  getDeliveryThunk,
  updateDeliveryThunk,
  createDeliveryThunk,
  deleteDeliveryThunk,
})(DeliveryContainer);
