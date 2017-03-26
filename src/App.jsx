import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import Map from './Map';

const App = (props) => (
  <div className="App">
    <div>
      <h3>{props.counter}</h3>
      <button onClick={props.onClick}>
        Increment
      </button>
    </div>
    <Map />
  </div>
);

const stateToProps = (state) => (
  {counter: state.get('counter')}
);


const dispatchToProps = (dispatch) => ({
  onClick: () => dispatch({type: 'COUNTER_INCREMENTED'})
});


export default connect(stateToProps, dispatchToProps)(App);
