import { ADD_COLOR_SCHEME } from './actionTypes';

export default (data) => {
  return {
    type: ADD_COLOR_SCHEME,
    data: data
  };
};
