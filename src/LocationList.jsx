import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

function elements(sources, itemClick) {
  return sources.map(location => (
    <li key={location.id}>
      <p>
        <a href={`/locations/${location.id}`} onClick={_.partial(itemClick, location)}>
          {location.name}
        </a>
      </p>
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
  itemClick: (location, event) => {
    event.preventDefault();
    dispatch({type: 'POINT_SELECTED', payload: location});
  }
});

export default connect(stateToProps, dispatchToProps)(LocationList);
