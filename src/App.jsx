import React from 'react';
import {connect} from 'react-redux';
import './css/App.css';
import Map from './Map';
import Header from './Header';
import List from './LocationList';

function bodyComponent(currentPage) {
  if (currentPage === 'map') {
    return <Map />;
  }
  return <List />;
}

const App = (props) => {
  return (
    <div className="App">
      <Header />
      {bodyComponent(props.currentPage)}
    </div>
  );
};

const stateToProps = (state) => ({
  currentPage: state.get('currentPage')
});

export default connect(stateToProps)(App);
