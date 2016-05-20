/**
 * 文字颜色面板数据控制
 */

import { ADD_TEXT_COLOR, SET_TEXT_COLOR_ACTIVE_INDEX, SET_TEXT_COLOR_PANEL_VISIBLE } from '../actions/actionTypes';

const initState = {
  visible: false,
  currentColorIndex: -1,
  colors: ['null']
};

export function textColorPanelData(state = initState, action) {
  switch (action.type) {
    case ADD_TEXT_COLOR:
      return (() => {
        let newState = {
          visible: state.visible,
          currentColorIndex: state.currentColorIndex,
          colors: state.colors.slice(0)
        };
        newState.colors.splice(newState.colors.length - 1, 0, action.color);
        return newState;
      })();
    case SET_TEXT_COLOR_ACTIVE_INDEX:
      return {
        visible: state.visible,
        currentColorIndex: action.index,
        colors: state.colors.slice(0)
      };
    case SET_TEXT_COLOR_PANEL_VISIBLE:
      return {
        visible: action.visible,
        currentColorIndex: state.currentColorIndex,
        colors: state.colors.slice(0)
      };
    default:
      return state;
  }
}
