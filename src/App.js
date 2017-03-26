import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h3>HELLO</h3>
        <a href="#" onClick={this.click.bind(this)}>
          Increment
        </a>
      </div>
    );
  }

  click(e) {
    e.preventDefault();
    this.props.store.dispatch({type: "COUNTER_INCREMENTED"});
  }
}

export default App;
