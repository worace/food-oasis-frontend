import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import Imm from 'immutable';
import _ from 'lodash';

const MapboxToken = 'pk.eyJ1Ijoid29yYWNlIiwiYSI6ImNqMHEzcmpqNzAxbGwzM281bHQ3dDBsOXIifQ.75hrCmvGH7KVs2Hyl86pzw';

function pointTuple({latitude, longitude}) {
  return [longitude, latitude];
}

class Map extends Component {
  render() {
    return (
      <div style={{position: 'relative'}}>
        <ReactMapboxGl
          // eslint-disable-next-line
          style="mapbox://styles/mapbox/streets-v8"
          accessToken={MapboxToken}
          center={this.props.center}
          containerStyle={{height: '100vh', width: '100vw', position: 'relative'}}
          onDrag={this.props.mapDrag}>
          {this.mapLayers()}
        </ReactMapboxGl>
      </div>
    );
  }

  mapLayers() {
    const icons = {
      'food-pantry': 'bakery-15',
      'community-garden': 'garden-15',
      'supermarket': 'fast-food-15',
      'farmers-market': 'picnic-site-15'
    };

    return this.props.sources.entrySeq().map(([layerName, points]) => {
      return this.mapLayer(layerName, icons[layerName], points);
    });
  }

  mapLayer(id, icon, points) {
    return (
      <Layer
        type="symbol"
        key={id}
        id={id}
        layout={{'icon-image': icon }}>
        {this.featureSet(points)}
      </Layer>
    );
  }

  featureSet(points) {
    return points
      .map(point => (
        <Feature
          onClick={_.partial(this.props.pointClicked, point)}
          name={point.name}
          key={`${point.latitude}-${point.longitude}`}
          coordinates={pointTuple(point)} />
      ));
  }
}

const stateToProps = (state) => ({
  center: [state.getIn(['center', 'longitude']),
           state.getIn(['center', 'latitude'])],
  sources: state.get('sources')});

function lngLatToCoords({lng, lat}) {
  return Imm.Map({latitude: lat, longitude: lng});
}

const dispatchToProps = (dispatch) => ({
  mapDrag: (map) => {
    dispatch({type: 'MAP_MOVED',
              coordinates: lngLatToCoords(map.getCenter())});
  },
  pointClicked: (point, target) => {
  }
});

export default connect(stateToProps, dispatchToProps)(Map);
