import { SET_COLOR_SCHEME_ACTIVE_INDEX, ADD_COLOR_SCHEME } from './actionTypes';

export function setColorSchemeActiveIndex(index) {
  return {
    type: SET_COLOR_SCHEME_ACTIVE_INDEX,
    index: index
  };
}

export function addColorScheme(data) {
  return {
    type: ADD_COLOR_SCHEME,
    data: data
  };
}
