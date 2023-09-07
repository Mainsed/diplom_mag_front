import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { IClientProps, IState } from '../Redux/interfaces';
import {
  getClientThunk,
  updateClientThunk,
  createClientThunk,
  deleteClientThunk,
} from '../Redux/reducers/clientReducer';
import Client from '../Components/Client/Client';

const ClientContainer = (props: any) => {
  useEffect(() => {}, []);
  return <Client {...props} />;
};

const mapStateToProps = (state: IState): Partial<IClientProps> => {
  return {
    client: state.client,
  };
};

export default connect(mapStateToProps, {
  getClientThunk,
  updateClientThunk,
  createClientThunk,
  deleteClientThunk,
})(ClientContainer);
