/**
 * 文字颜色面板数据控制
 */

import { ADD_TEXT_COLOR, SET_TEXT_COLOR_ACTIVE_INDEX } from '../actions/actionTypes';

const initState = {
  currentColorIndex: -1,
  colors: ['null']
};

export function textColorPanelData(state = initState, action) {
  switch (action.type) {
    case ADD_TEXT_COLOR:
      return (() => {
        let newState = {
          currentColorIndex: state.currentColorIndex,
          colors: state.colors.slice(0)
        };
        newState.colors.splice(newState.colors.length - 1, 0, action.color);
        return newState;
      })();
    case SET_TEXT_COLOR_ACTIVE_INDEX:
      return {
        currentColorIndex: action.index,
        colors: state.colors.slice(0)
      };
    default:
      return state;
  }
}
