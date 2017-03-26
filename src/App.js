import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import Map from './Map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <h3>{this.props.counter}</h3>
          <a href="#" onClick={this.props.onClick}>
            Increment
          </a>
        </div>
        <Map />
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {counter: state.get('counter')};
};

const dispatchToProps = (dispatch) => {
  return {
    onClick: () => dispatch({type: 'COUNTER_INCREMENTED'})
  };
};


export default connect(stateToProps, dispatchToProps)(App);
