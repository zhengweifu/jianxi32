/**
 * 节点面板数据控制
 */

import { ADD_NODE, REMOVE_NODE, SET_NODE, SET_NODE_ACTIVE_INDEX, MOVE_NODE } from '../actions/actionTypes';

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
    case MOVE_NODE:
      return (() => {
        let newState = copyState(state);
        newState.items.splice(action.to, 0, newState.items.splice(action.from, 1)[0]);
        if(newState.activeIndex !== -1) {
          if(action.from === newState.activeIndex) {
            newState.activeIndex = action.to;
          } else {
            newState.activeIndex = newState.items.findIndex(
              (item, index) => item.id == state.items[newState.activeIndex]['id']
            );
            //console.log(newState.activeIndex);
          }
        }
        return newState;
      })();
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
