import { SET_NODE } from './actionTypes';

export default (index, data) => {
  return {
    type: SET_NODE,
    index: index,
    data: data
  };
};
