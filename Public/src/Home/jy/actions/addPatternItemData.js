import { ADD_PATTERN_ITEM_DATA } from './actionTypes';

export default (title, data) => {
  return {
    type: ADD_PATTERN_ITEM_DATA,
    title: title,
    data: data
  };
};
