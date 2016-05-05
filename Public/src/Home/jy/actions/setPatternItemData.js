import { SET_PATTERN_ITEM_DATA } from './actionTypes';

export default (title, index, data) => {
  return {
    type: SET_PATTERN_ITEM_DATA,
    title: title,
    index: index,
    data: data
  };
};
