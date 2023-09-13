import { applyMiddleware, combineReducers, createStore } from 'redux';
import staffReducer from './reducers/staffReducer';
import ReduxThunk from 'redux-thunk';
import clientReducer from './reducers/clientReducer';
import clothReducer from './reducers/clothReducer';
import orderReducer from './reducers/orderReducer';

const reducers = combineReducers({
  staff: staffReducer,
  client: clientReducer,
  cloth: clothReducer,
  order: orderReducer,
});

const store = createStore(reducers, applyMiddleware(ReduxThunk));

export default store;
