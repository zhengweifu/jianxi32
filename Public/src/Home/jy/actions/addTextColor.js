import { ADD_TEXT_COLOR } from './actionTypes';

export default (color) => {
  return {
    type: ADD_TEXT_COLOR,
    color: color
  };
};
