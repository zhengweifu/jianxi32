import { REMOVE_NODE } from './actionTypes';

export default (index) => {
  return {
    type: REMOVE_NODE,
    index: index
  };
};
