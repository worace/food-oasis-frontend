import React from 'react';
import ReactDOM from 'react-dom';
import Imm from 'immutable';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import './index.css';

function inc(value) { return value + 1; }

const ActionHandlers = {
  COUNTER_INCREMENTED: (state) => state.update('counter', inc),
  POINT_ADDED: (state, action) => (
    state.update('points', old => old.push(action.coordinates))
  ),
  MAP_MOVED: (state, action) => state.set('center', action.coordinates)
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
  center: Imm.Map({latitude: 34.0522, longitude: -118.2437}),
  points: Imm.List([Imm.Map({latitude: 34.023499,
                             longitude: -118.382667})])
});

const Store = createStore(reducer, initialState);

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
