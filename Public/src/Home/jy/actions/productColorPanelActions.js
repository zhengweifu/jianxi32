import { ADD_PRODUCT_COLOR, SET_PRODUCT_COLOR_ACTIVE_INDEX, SET_PRODUCT_COLOR_PANEL_VISIBLE } from './actionTypes';

export function addProductColor(color) {
  return {
    type: ADD_PRODUCT_COLOR,
    color: color
  };
}

export function setProductColorActiveIndex (index) {
  return {
    type: SET_PRODUCT_COLOR_ACTIVE_INDEX,
    index: index
  };
}

export function setProductColorPanelVisible(visible) {
  return {
    type: SET_PRODUCT_COLOR_PANEL_VISIBLE,
    visible: visible
  };
}
