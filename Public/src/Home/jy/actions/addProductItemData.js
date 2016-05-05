import { ADD_PRODUCT_ITEM_DATA } from './actionTypes';

export default (title, data) => {
  return {
    type: ADD_PRODUCT_ITEM_DATA,
    title: title,
    data: data
  };
};
