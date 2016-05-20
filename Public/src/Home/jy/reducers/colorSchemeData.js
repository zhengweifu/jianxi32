/**
 * 色彩风格数据控制
 */

import { ADD_COLOR_SCHEME, SET_COLOR_SCHEME_ACTIVE_INDEX } from '../actions/actionTypes';


const initState = {
  activeIndex: -1,
  items: []
};

export function colorSchemeData(state = initState, action) {
  switch (action.type) {
    case ADD_COLOR_SCHEME:
      return (() => {
        let newState = {
          activeIndex: state.activeIndex,
          items: state.items.map((item, index) => {
            return Object.assign({}, item);
          })
        };

        newState.items.push(Object.assign({}, action.data));

        return newState;
      })();
    case SET_COLOR_SCHEME_ACTIVE_INDEX:
      return {
        activeIndex: action.index,
        items: state.items.map((item, index) => {
          return Object.assign({}, item);
        })
      };
    default:
      return state;
  }
}
