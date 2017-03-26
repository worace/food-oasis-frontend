import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore } from 'redux';

const ActionHandlers = {
  "COUNTER_INCREMENTED": (state, action) => state
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

const initialState = {counter: 0};

const Store = createStore(reducer, initialState);

ReactDOM.render(
  <App store={Store}/>,
  document.getElementById('root')
);
