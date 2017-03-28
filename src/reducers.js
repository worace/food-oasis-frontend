function inc(value) { return value + 1; }

const ActionHandlers = {
  COUNTER_INCREMENTED: (state) => state.update('counter', inc),
  MAP_MOVED: (state, action) => state.set('center', action.coordinates),
  POINT_SELECTED: (state, action) => state.set('activePoint', action.payload),
  POINT_CLEARED: (state) => state.set('activePoint', null),
  SOURCES_RECEIVED: (state, action) => state.set('sources', action.payload)
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
