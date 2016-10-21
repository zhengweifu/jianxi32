/**
 * 产品颜色面板数据控制
 */

import { ADD_PRODUCT_COLOR, SET_PRODUCT_COLOR_ACTIVE_INDEX, SET_PRODUCT_COLOR_PANEL_VISIBLE } from '../actions/actionTypes';

const initState = {
  visible: false,
  currentColorIndex: -1,
  colors: []
};

export function productColorPanelData(state = initState, action) {
  switch (action.type) {
    case ADD_PRODUCT_COLOR:
      return (() => {
        let newState = {
          visible: state.visible,
          currentColorIndex: state.currentColorIndex,
          colors: state.colors.slice(0)
        };
        newState.colors.push(action.color);
        return newState;
      })();
    case SET_PRODUCT_COLOR_ACTIVE_INDEX:
      return {
        visible: state.visible,
        currentColorIndex: action.index,
        colors: state.colors.slice(0)
      };
    case SET_PRODUCT_COLOR_PANEL_VISIBLE:
      return {
        visible: action.visible,
        currentColorIndex: state.currentColorIndex,
        colors: state.colors.slice(0)
      };
    default:
      return state;
  }
}
