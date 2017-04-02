function inc(value) { return value + 1; }
function not(value) { return !value; }

const ActionHandlers = {
  COUNTER_INCREMENTED: (state) => state.update('counter', inc),
  MAP_MOVED: (state, action) => state.set('center', action.coordinates),
  POINT_SELECTED: (state, action) => state.set('activePoint', action.payload),
  POINT_CLEARED: (state) => state.set('activePoint', null),
  SOURCES_RECEIVED: (state, action) => state.set('sources', action.payload),
  PAGE_CHANGED: (state, action) => state.set('currentPage', action.payload),
  LOCATION_TYPE_TOGGLED: (state, action) => state.updateIn(['selectedLocationTypes', action.payload], not)
};

const reducers = (state, action) => {
  const handler = ActionHandlers[action.type];
  if (handler) {
    const next = handler(state, action);
    return next;
  }
  return state;
};

export default reducers;
