import { applyMiddleware, combineReducers, createStore } from 'redux';
import staffReducer from './reducers/staffReducer';
import ReduxThunk from 'redux-thunk';
import clientReducer from './reducers/clientReducer';

const reducers = combineReducers({
  staff: staffReducer,
  client: clientReducer,
});

const store = createStore(reducers, applyMiddleware(ReduxThunk));

export default store;
