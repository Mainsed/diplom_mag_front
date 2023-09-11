import { applyMiddleware, combineReducers, createStore } from 'redux';
import staffReducer from './reducers/staffReducer';
import ReduxThunk from 'redux-thunk';
import clientReducer from './reducers/clientReducer';
import clothReducer from './reducers/clothReducer';

const reducers = combineReducers({
  staff: staffReducer,
  client: clientReducer,
  cloth: clothReducer,
});

const store = createStore(reducers, applyMiddleware(ReduxThunk));

export default store;
