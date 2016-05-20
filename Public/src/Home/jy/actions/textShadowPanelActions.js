import { ADD_TEXT_SHADOW, SET_TEXT_SHADOW_ACTIVE_INDEX, SET_TEXT_SHADOW_PANEL_VISIBLE, SET_TEXT_SHADOW_SIZE } from './actionTypes';

export function addTextShadow(color) {
  return {
    type: ADD_TEXT_SHADOW,
    color: color
  };
}

export function setTextShadowActiveIndex (index) {
  return {
    type: SET_TEXT_SHADOW_ACTIVE_INDEX,
    index: index
  };
}

export function setTextShadowPanelVisible(visible) {
  return {
    type: SET_TEXT_SHADOW_PANEL_VISIBLE,
    visible: visible
  };
}

export function setTextShadowSize(size) {
  return {
    type: SET_TEXT_SHADOW_SIZE,
    size: size
  };
}
