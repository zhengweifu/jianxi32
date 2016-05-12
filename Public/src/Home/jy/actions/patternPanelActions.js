import { ADD_PATTERN_ITEM_DATA, SET_PATTERN_ITEM_DATA } from './actionTypes';

export function addPatternItemData(title, data) {
  return {
    type: ADD_PATTERN_ITEM_DATA,
    title: title,
    data: data
  };
}

export function setPatternItemData(title, index, data) {
  return {
    type: SET_PATTERN_ITEM_DATA,
    title: title,
    index: index,
    data: data
  };
}
