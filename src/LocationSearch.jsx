import React, {Component} from 'react';
import {connect} from 'react-redux';
import Imm from 'immutable';
import {partial} from 'lodash';
import Geo from './geocode';
import Api from './api';

class LocationSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.locationSearch(this.props, this.state.value);
  }

  locationTypeOptions() {
    return this.props
      .selectedLocationTypes
      .entrySeq()
      .map(([locationType, enabled]) => {
        return (
          <li key={locationType}>
            <label htmlFor={locationType}>{locationType}</label>
            <input
              onChange={partial(this.props.locationTypeToggled, locationType)}
              type="checkbox"
              name={locationType}
              value={locationType}
              checked={enabled}
              />
          </li>
        );
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <ul>
            {this.locationTypeOptions()}
          </ul>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const stateToProps = (state) => ({
  selectedLocationTypes: state.get('selectedLocationTypes')
});

const dispatchToProps = (dispatch) => ({
  locationTypeToggled: (locationType) => dispatch({type: 'LOCATION_TYPE_TOGGLED', payload: locationType}),
  locationSearch: (props, query) => {
    Geo.lookup(query)
      .then(GeoPlace => GeoPlace.location)
      .then(({lat, lng}) => {
        const coordinates = Imm.Map({latitude: lat,
                                     longitude: lng});
        dispatch({type: 'MAP_MOVED', coordinates});
        Api.getLocations(dispatch, coordinates);
      });
  }
});

export default connect(stateToProps, dispatchToProps)(LocationSearch);
