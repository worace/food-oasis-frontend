import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import Imm from 'immutable';

const MapboxToken = 'pk.eyJ1Ijoid29yYWNlIiwiYSI6ImNqMHEzcmpqNzAxbGwzM281bHQ3dDBsOXIifQ.75hrCmvGH7KVs2Hyl86pzw';

function pointTuple({latitude, longitude}) {
  return [longitude, latitude];
}

class Map extends Component {
  render() {
    return (
      <div style={{position: 'relative'}}>
        <ReactMapboxGl
          style="mapbox://styles/mapbox/streets-v8"
          accessToken={MapboxToken}
          center={this.props.center}
          containerStyle={{height: "100vh",width: "100vw",position:'relative'}}
          onClick={this.props.mapClick}
          onDrag={this.props.mapDrag}
          >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}>
            {this.features()}
          </Layer>
        </ReactMapboxGl>
      </div>
    );
  }

  features() {
    return this.props.points
      .toJS()
      .map(pointTuple)
      .map(pt => {
        return <Feature key={`${pt[0]}-${pt[1]}`} coordinates={pt} />;
      });
  }
}

const stateToProps = (state) => {
  return {
    center: [state.getIn(['center', 'longitude']),
             state.getIn(['center', 'latitude'])],
    points: state.get('points')
  };
};

function lngLatToCoords({lng, lat}) {
  return Imm.Map({latitude: lat, longitude:lng});
}

const dispatchToProps = (dispatch) => {
  return {
    mapClick: (map, event) => {
      dispatch({type: 'POINT_ADDED',
                coordinates: lngLatToCoords(event.lngLat)});
    },
    mapDrag: (map, event) => {
      dispatch({type: 'MAP_MOVED',
                coordinates: lngLatToCoords(map.getCenter())});
    }
  };
};

export default connect(stateToProps, dispatchToProps)(Map);
