import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { IClothProps, IState } from '../Redux/interfaces';
import {
  getClothThunk,
  updateClothThunk,
  createClothThunk,
  deleteClothThunk,
  getClothSizesThunk,
} from '../Redux/reducers/clothReducer';
import Cloth from '../Components/Cloth/Cloth';

const ClothContainer = (props: any) => {
  useEffect(() => {}, []);
  return <Cloth {...props} />;
};

const mapStateToProps = (state: IState): Partial<IClothProps> => {
  return {
    cloth: state.cloth,
  };
};

export default connect(mapStateToProps, {
  getClothThunk,
  updateClothThunk,
  createClothThunk,
  deleteClothThunk,
  getClothSizesThunk,
})(ClothContainer);
