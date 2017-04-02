import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactMapboxGl, { Popup, Marker } from 'react-mapbox-gl';
import Imm from 'immutable';
import _ from 'lodash';
import Api from './api';
import ActivePointDetails from './ActivePointDetails';

const MapboxToken = 'pk.eyJ1Ijoid29yYWNlIiwiYSI6ImNqMHEzcmpqNzAxbGwzM281bHQ3dDBsOXIifQ.75hrCmvGH7KVs2Hyl86pzw';

function pointTuple({latitude, longitude}) {
  return [longitude, latitude];
}

const locationClassNames = {
  food_pantry: 'food-pantry-marker',
  farmers_market: 'farmers-market-marker',
  community_garden: 'community-garden-marker',
  supermarket: 'supermarket-marker'
};

class Map extends Component {
  render() {
    return (
      <div style={{position: 'relative'}}>
        {this.activePointDetails()}
        <ReactMapboxGl
          // eslint-disable-next-line
          style='mapbox://styles/mapbox/basic-v9'
          accessToken={MapboxToken}
          center={this.props.center}
          containerStyle={{height: '80vh', width: '100vw', position: 'relative'}}
          onDrag={this.props.mapDrag}
          onClick={this.props.mapClick}
          >
          {this.markers()}
        </ReactMapboxGl>
      </div>
    );
  }

  activePointDetails() {
    if (this.props.activePoint) {
      return <ActivePointDetails point={this.props.activePoint} />;
    }
    return undefined;
  }

  markers() {
    return this
      .props
      .sources
      .filter(point => (
        this.props
          .selectedLocationTypes
          .get(point.location_type)
      ))
      .map(this.marker.bind(this))
      .toJS();
  }

  activePoint() {
    if (this.props.activePoint) {
      return (
        <Popup
          coordinates={pointTuple(this.props.activePoint)}
          style={{padding: '5px'}}
          anchor={'top'}>
          <p style={{margin: '0'}}>{this.props.activePoint.name}</p>
        </Popup>
      );
    }
    return null;
  }

  marker(point) {
    let locationTypeClass = locationClassNames[point.location_type];
    if (this.props.activePoint && this.props.activePoint.id === point.id) {
      locationTypeClass += ' active';
    }

    return (
      <Marker
        className={`marker ${locationTypeClass}`}
        coordinates={pointTuple(point)}
        onClick={_.partial(this.props.pointClicked, point)}
        key={point.id}
        >
        <span className="label">{point.name}</span>
      </Marker>
    );
  }
}

const stateToProps = (state) => ({
  center: [state.getIn(['center', 'longitude']),
           state.getIn(['center', 'latitude'])],
  activePoint: state.get('activePoint'),
  selectedLocationTypes: state.get('selectedLocationTypes'),
  sources: state.get('sources')
});

function lngLatToCoords({lng, lat}) {
  return Imm.Map({latitude: lat, longitude: lng});
}

const dispatchToProps = (dispatch) => ({
  mapDrag: (map) => {
    dispatch({type: 'MAP_MOVED',
              coordinates: lngLatToCoords(map.getCenter())});
  },
  mapClick: (map, event) => {
    const coordinates = lngLatToCoords(event.lngLat);
    dispatch({type: 'POINT_CLEARED'});
    dispatch({type: 'MAP_MOVED', coordinates});
    Api.getLocations(dispatch, coordinates);
  },
  pointClicked: (point) => {
    dispatch({type: 'POINT_SELECTED', payload: point});
  }
});

export default connect(stateToProps, dispatchToProps)(Map);
