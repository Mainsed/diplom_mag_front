import { applyMiddleware, combineReducers, createStore } from 'redux';
import staffReducer from './reducers/staffReducer';
import ReduxThunk from 'redux-thunk';
import clientReducer from './reducers/clientReducer';
import clothReducer from './reducers/clothReducer';
import orderReducer from './reducers/orderReducer';
import storeReducer from './reducers/storeReducer';
import deliveryReducer from './reducers/deliveryReducer';
import reportsReducer from './reducers/reportsReducer';
import authReducer from './reducers/authReducer';

const reducers = combineReducers({
  staff: staffReducer,
  client: clientReducer,
  cloth: clothReducer,
  order: orderReducer,
  store: storeReducer,
  delivery: deliveryReducer,
  reports: reportsReducer,
  auth: authReducer,
});

const store = createStore(reducers, applyMiddleware(ReduxThunk));

export default store;
