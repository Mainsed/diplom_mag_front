import { applyMiddleware, combineReducers, createStore } from 'redux';
import generalReducer from './generalReducer';
import ReduxThunk from 'redux-thunk';

const reducers = combineReducers({
  general: generalReducer,
});

const store = createStore(reducers, applyMiddleware(ReduxThunk));

export default store;
