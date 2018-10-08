import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { podReducer } from './reducers/pod.js';

const store = createStore(
  podReducer,
  applyMiddleware(thunk)
);

export default store;
