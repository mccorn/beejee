import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from './reducer';

const config = {
  duration: true,
  timestamp: false,
  collapsed: true,
};
const store = createStore(reducer, {}, applyMiddleware(createLogger(config)));

export default store;

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./reducer', () => {
    store.replaceReducer(reducer);
  });
}
