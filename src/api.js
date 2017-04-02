import axios from 'axios';
import Imm from 'immutable';

const API_HOSTS = {
  development: 'http://localhost:9292',
  production: 'https://glacial-tundra-57558.herokuapp.com'
};

// process.env variables are templated in by the webpack
// config; NODE_ENV is one provided by default
const API_BASE = API_HOSTS[process.env.NODE_ENV];

function queryString(map) {
  return '?' + map.entrySeq()
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
}

function url(path, params) {
  return API_BASE + path + queryString(params);
}

export default {
  getLocations: (dispatch, coords) => {
    const fullUrl = url('/nearby', coords);
    return axios.get(fullUrl)
      .then(resp => Imm.List(resp.data))
      .then(sources => dispatch({type: 'SOURCES_RECEIVED', payload: sources}));
  }
};
