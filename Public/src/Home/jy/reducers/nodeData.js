import { ADD_NODE, REMOVE_NODE, SET_NODE, SET_NODE_ACTIVE_INDEX } from '../actions/actionTypes';

const initState = {
  activeIndex: -1,
  items: []
};

export function nodeData(state = initState, action) {
  switch (action.type) {
    case ADD_NODE:
      return (() => {
        let newState = copyState(state);
        newState.items.push(action.data);
        return newState;
      })();
    case REMOVE_NODE:
      return (() => {
        let newState = copyState(state);
        let dindex = action.index;
        if(dindex > -1 && dindex <= newState.items.length) {
          newState.items.splice(dindex, 1);
          if(newState.activeIndex < 0 || (newState.activeIndex == 0 && dindex == 0)) {
            newState.activeIndex = -1;
          } else if(newState.activeIndex > dindex) {
            newState.activeIndex -= 1;
          }
        }

        return newState;
      })();
    case SET_NODE:
      return (() => {
        let newState = copyState(state);
        Object.assign(newState.items[action.index], action.data);
        return newState;
      })();
    case SET_NODE_ACTIVE_INDEX:
      return Object.assign(copyState(state), {activeIndex: action.index});
    default:
      return state;
  }
}

function copyState(state) {
  return {
    activeIndex : state.activeIndex,
    items: state.items.map((item) => {
      return Object.assign({}, item);
    })
  };
}
