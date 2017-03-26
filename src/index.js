import React from 'react';
import ReactDOM from 'react-dom';
import Imm from 'immutable';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import {createLogger} from 'redux-logger';
import App from './App';
import './index.css';
import sourceData from './source_data';

function inc(value) { return value + 1; }

const ActionHandlers = {
  COUNTER_INCREMENTED: (state) => state.update('counter', inc),
  MAP_MOVED: (state, action) => state.set('center', action.coordinates),
  POINT_SELECTED: (state, action) => state.set('activePoint', action.payload),
  POINT_CLEARED: (state, action) => state.set('activePoint', null)
};

const reducer = (state, action) => {
  const handler = ActionHandlers[action.type];
  if (handler) {
    const next = handler(state, action);
    return next;
  }
  return state;
};

const initialState = Imm.Map({
  counter: 0,
  sources: Imm.Map(sourceData),
  center: Imm.Map({latitude: 34.0522, longitude: -118.2437}),
  activePoint: null
});

const logger = createLogger({
  stateTransformer: (state) => state.toJS()
});
const Store = createStore(reducer,
                          initialState,
                          applyMiddleware(logger));

window.store = Store;

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
