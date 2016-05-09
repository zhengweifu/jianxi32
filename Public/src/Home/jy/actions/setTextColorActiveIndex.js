import { SET_TEXT_COLOR_ACTIVE_INDEX } from './actionTypes';

export default (index) => {
  return {
    type: SET_TEXT_COLOR_ACTIVE_INDEX,
    index: index
  };
};
