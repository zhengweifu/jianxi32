import { SET_NODE_ACTIVE_INDEX } from './actionTypes';

export default (index) => {
  return {
    type: SET_NODE_ACTIVE_INDEX,
    index: index
  };
};
