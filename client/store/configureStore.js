import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';
import {getSearchEntries, fetchEntries} from '../actions/searchAction'

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);


export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState);

  return store;
};
