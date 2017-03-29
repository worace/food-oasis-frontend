import React from 'react';
import {connect} from 'react-redux';

function elements(sources, itemClick) {
  return sources.get('supermarket').map(location => (
    <li key={location.id}>
      <p><a onClick={itemClick}>{location.name}</a></p>
    </li>
  ));
}

const LocationList = (props) => (
  <ul>
    {elements(props.sources, props.itemClick)}
  </ul>
 );

const stateToProps = (state) => ({
  sources: state.get('sources')});

const dispatchToProps = (dispatch) => ({
  itemClick: (event) => {
    console.log(event);
  }
});

export default connect(stateToProps, dispatchToProps)(LocationList);
