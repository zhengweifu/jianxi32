import { SET_PRODUCT_ITEM_DATA } from './actionTypes';

export default (title, index, data) => {
  return {
    type: SET_PRODUCT_ITEM_DATA,
    title: title,
    index: index,
    data: data
  };
};
