import { ADD_NODE } from './actionTypes';
/**
 * [default 添加 Node 数据]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export default (data) => {
  return {
    type: ADD_NODE,
    data: data
  };
};
