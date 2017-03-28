import axios from 'axios';
import Imm from 'immutable';

const API_BASE = 'http://localhost:9393';

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
      .then(resp => Imm.Map(resp.data).map(jsArr => Imm.List(jsArr)))
      .then(sources => dispatch({type: 'SOURCES_RECEIVED', payload: sources}));
  }
};
