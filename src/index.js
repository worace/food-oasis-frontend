import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore } from 'redux';
import { Map } from 'immutable';
import { Provider } from 'react-redux';

function inc(value) { return value + 1; }

const ActionHandlers = {
  "COUNTER_INCREMENTED": (state, action) => state.update('counter', inc)
};

const reducer = (state, action) => {
  console.log('Handling Action: ', action);
  const handler = ActionHandlers[action.type];
  if (handler) {
    const next = handler(state, action);
    return next;
  } else {
    return state;
  }
};

const initialState = Map({
  counter: 0,
  center: Map({latitude: 34.0522, longitude: -118.2437})
});

const Store = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
