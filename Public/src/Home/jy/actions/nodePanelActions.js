import { 
  ADD_NODE, 
  SET_NODE, 
  SET_NODE_ACTIVE_INDEX, 
  REMOVE_NODE, 
  MOVE_NODE 
} from './actionTypes';
/**
 * [default 添加 Node 数据]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function addNode(data) {
  return {
    type: ADD_NODE,
    data: data
  };
}

export function setNode(index, data) {
  return {
    type: SET_NODE,
    index: index,
    data: data
  };
}

export function setNodeActiveIndex(index) {
  return {
    type: SET_NODE_ACTIVE_INDEX,
    index: index
  };
}

export function removeNode(index) {
  return {
    type: REMOVE_NODE,
    index: index
  };
}

export function moveNode(from, to) {
  return {
    type: MOVE_NODE,
    from: from,
    to: to
  };
}
