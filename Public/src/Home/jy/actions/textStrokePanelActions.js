import { ADD_TEXT_STROKE, SET_TEXT_STROKE_ACTIVE_INDEX, SET_TEXT_STROKE_PANEL_VISIBLE } from './actionTypes';

export function addTextStroke(color) {
  return {
    type: ADD_TEXT_STROKE,
    color: color
  };
}

export function setTextStrokeActiveIndex (index) {
  return {
    type: SET_TEXT_STROKE_ACTIVE_INDEX,
    index: index
  };
}

export function setTextStrokePanelVisible(visible) {
  return {
    type: SET_TEXT_STROKE_PANEL_VISIBLE,
    visible: visible
  };
}
