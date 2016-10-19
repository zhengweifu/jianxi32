/**
 * 文字描边面板数据控制
 */

import { ADD_TEXT_SHADOW, SET_TEXT_SHADOW_ACTIVE_INDEX, SET_TEXT_SHADOW_PANEL_VISIBLE, SET_TEXT_SHADOW_SIZE } from '../actions/actionTypes';

const initState = {
  visible: false,
  size: 0,
  currentColorIndex: -1,
  colors: ['transparent']
};

export function textShadowPanelData(state = initState, action) {
  switch (action.type) {
    case ADD_TEXT_SHADOW:
      return (() => {
        let newState = {
          visible: state.visible,
          size: state.size,
          currentColorIndex: state.currentColorIndex,
          colors: state.colors.slice(0)
        };
        newState.colors.splice(newState.colors.length - 1, 0, action.color);
        return newState;
      })();
    case SET_TEXT_SHADOW_ACTIVE_INDEX:
      return {
        visible: state.visible,
        size: state.size,
        currentColorIndex: action.index,
        colors: state.colors.slice(0)
      };
    case SET_TEXT_SHADOW_PANEL_VISIBLE:
      return {
        visible: action.visible,
        size: state.size,
        currentColorIndex: state.currentColorIndex,
        colors: state.colors.slice(0)
      };
    case SET_TEXT_SHADOW_SIZE:
      return {
        visible: state.visible,
        size: action.size,
        currentColorIndex: state.currentColorIndex,
        colors: state.colors.slice(0)
      };
    default:
      return state;
  }
}
