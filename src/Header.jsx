import React from 'react';
import Imm from 'immutable';
import logo from './images/fola.svg';
import {connect} from 'react-redux';
import LocationSearch from './LocationSearch';
import Geo from './geocode';
import Api from './api';
// import search from './images/icons/search-black.svg';

const Header = (props) => (
  <header className="header">
    <div className="primary-nav">
      <h2>
        <a href="/">
          <img src={logo} width="100" alt="Food Oasis Los Angeles" />
        </a>
      </h2>
      <p className="tagline">Healthy Food for All Angelenos</p>
      <ul>
        <li key="map">
          <a onClick={props.pageChanged('map')} href="/map">Map</a>
        </li>
        <li key="list">
          <a onClick={props.pageChanged('list')} href="/list">List</a>
        </li>
      </ul>
      <LocationSearch locationSearch={props.locationSearch} />
    </div>
  </header>
);

const stateToProps = (state) => ({
  currentPage: state.get('currentPage')
});

const dispatchToProps = (dispatch) => ({
  pageChanged: (newPage) => (event) => {
    event.preventDefault();
    dispatch({type: 'PAGE_CHANGED', payload: newPage});
  },
  locationSearch: (query) => {
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

export default connect(stateToProps, dispatchToProps)(Header);

// <nav className="secondary-nav location-list-nav">
//   <ul className="options" id="search-views">
//     <li className="filter">
//       <a href="/filters/?type=supermarket" id="filters-link">Filter</a>
//     </li>

//     <li className="view" id="list-button" style={{display: 'none'}}>
//       <a href="">List</a>
//     </li>
//     <li className="view" id="map-button" style={{display: 'none'}}>
//       <a href="">Map</a>
//     </li>
//   </ul>
// </nav>
// <li className="search">
// <a href="/search/?type=supermarket" id="search-link">
// <img src={search} width="50" style={{height: '1.5em', width: 'auto'}} alt="Search" />
// <span id="search-type" style={{textTransform: 'capitalize'}}>supermarkets</span>
// <span id="search-near">near</span>
// <em id="search-location" style={{fontStyle: 'normal'}}>Downtown Los Angeles</em>
// </a>
// </li>
