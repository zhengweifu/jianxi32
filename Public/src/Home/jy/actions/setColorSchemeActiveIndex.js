import { SET_COLOR_SCHEME_ACTIVE_INDEX } from './actionTypes';

export default (index) => {
  return {
    type: SET_COLOR_SCHEME_ACTIVE_INDEX,
    index: index
  };
};
