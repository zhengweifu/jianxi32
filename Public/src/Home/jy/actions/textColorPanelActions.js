import { ADD_TEXT_COLOR, SET_TEXT_COLOR_ACTIVE_INDEX, SET_TEXT_COLOR_PANEL_VISIBLE } from './actionTypes';

export function addTextColor(color) {
  return {
    type: ADD_TEXT_COLOR,
    color: color
  };
}

export function setTextColorActiveIndex (index) {
  return {
    type: SET_TEXT_COLOR_ACTIVE_INDEX,
    index: index
  };
}

export function setTextColorPanelVisible(visible) {
  return {
    type: SET_TEXT_COLOR_PANEL_VISIBLE,
    visible: visible
  };
}
