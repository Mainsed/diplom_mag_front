import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { IStoreProps, IState } from '../Redux/interfaces';
import {
  getStoreThunk,
  updateStoreThunk,
  createStoreThunk,
  deleteStoreThunk,
} from '../Redux/reducers/storeReducer';
import Store from '../Components/Store/Store';

const StoreContainer = (props: any) => {
  useEffect(() => {}, []);
  return <Store {...props} />;
};

const mapStateToProps = (state: IState): Partial<IStoreProps> => {
  return {
    store: state.store,
  };
};

export default connect(mapStateToProps, {
  getStoreThunk,
  updateStoreThunk,
  createStoreThunk,
  deleteStoreThunk,
})(StoreContainer);
