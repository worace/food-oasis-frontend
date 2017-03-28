import React from 'react';
import logo from './images/fola.svg';
import search from './images/icons/search-black.svg';

const Header = () => (
  <header className="header">
    <div className="primary-nav">
      <h2>
        <a href="/">
          <img src={logo} width="100" alt="Food Oasis Los Angeles" />
        </a>
      </h2>
      <p className="tagline">Healthy Food for All Angelenos</p>
    </div>
  </header>
);

export default Header;

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
