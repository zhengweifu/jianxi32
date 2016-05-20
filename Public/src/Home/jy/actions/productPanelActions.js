import { ADD_PRODUCT_ITEM_DATA, SET_PRODUCT_ITEM_DATA } from './actionTypes';

export function addProductItemData(title, data) {
  return {
    type: ADD_PRODUCT_ITEM_DATA,
    title: title,
    data: data
  };
}

export function setProductItemData(title, index, data) {
  return {
    type: SET_PRODUCT_ITEM_DATA,
    title: title,
    index: index,
    data: data
  };
}
