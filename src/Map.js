import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import Imm from 'immutable';

const MapboxToken = 'pk.eyJ1Ijoid29yYWNlIiwiYSI6ImNqMHEzcmpqNzAxbGwzM281bHQ3dDBsOXIifQ.75hrCmvGH7KVs2Hyl86pzw';

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
          >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}>
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
          </Layer>
        </ReactMapboxGl>
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    center: [state.getIn(['center', 'longitude']),
             state.getIn(['center', 'latitude'])]
  };
};

const dispatchToProps = (dispatch) => {
  return {
    mapClick: (map, event) => {
      const {lng, lat} = event.lngLat;
      dispatch({type: 'POINT_ADDED',
                coordinates: Imm.Map({latitude: lat,
                                      longitude: lng})});
    }
  };
};

export default connect(stateToProps, dispatchToProps)(Map);
