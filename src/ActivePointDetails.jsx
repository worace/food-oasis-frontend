import React from 'react';
import farmers_market from './images/icons/farmers_market.svg';
import community_garden from './images/icons/community_garden.svg';
import food_pantry from './images/icons/food_pantry.svg';
import supermarket from './images/icons/supermarket.svg';

const icons = {
  farmers_market,
  community_garden,
  food_pantry,
  supermarket
};

const locationTypeNames = {
  farmers_market: 'Farmer\'s Market',
  community_garden: 'Community Garden',
  food_pantry: 'Food Pantry',
  supermarket: 'Supermarket'
};

export default ({point}) => {
  return (
    <div>
      <img
        alt={locationTypeNames[point.location_type]}
        src={icons[point.location_type]}
        />
      <h1>{point.name}</h1>
      <h2>{point.address_1}</h2>
      <h3>{locationTypeNames[point.location_type]}</h3>
      <p>{point.distance} mi</p>
    </div>
  );
};
