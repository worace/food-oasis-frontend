import React from 'react';
import ReactDOM from 'react-dom';
import Imm from 'immutable';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import {createLogger} from 'redux-logger';
import App from './App';
import Api from './api';
import reducers from './reducers';

const initialState = Imm.Map({
  currentPage: 'map',
  counter: 0,
  selectedLocationTypes: Imm.Map({supermarket: true,
                                  farmers_market: true,
                                  community_garden: true,
                                  food_pantry: true}),
  sources: Imm.List(),
  center: Imm.Map({latitude: 34.0522, longitude: -118.2437}),
  activePoint: null
});

const logger = createLogger({
  stateTransformer: (state) => state.toJS()
});

const Store = createStore(reducers,
                          initialState,
                          applyMiddleware(logger));

function init() {
  Api.getLocations(Store.dispatch, Store.getState().get('center'));

  ReactDOM.render(
    // eslint-disable-next-line react/jsx-filename-extension
    <Provider store={Store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}


init();
