import { SET_PATTERN_TITLE_INDEX } from './actionTypes';

export default (index) => {
  return {
    type: SET_PATTERN_TITLE_INDEX,
    index: index
  };
};
