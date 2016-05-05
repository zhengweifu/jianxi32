import { SET_PRODUCT_ITEM_DATA, ADD_PRODUCT_ITEM_DATA } from '../actions/actionTypes';

/**
state => {
  activeTitleIndex: xxx,
  activeItemIndex: xxx,
  tilesData: [{
    title: xxx,
    items: [{
      img: xxx,
      describtion: xxx
    },...
  ]},
  ...
]}
*/

const initState = {
  activeTitleIndex: -1,
  activeItemIndex: -1,
  tilesData: []
};

export function productData(state = initState, action) {
  switch (action.type) {
    case ADD_PRODUCT_ITEM_DATA:
    case SET_PRODUCT_ITEM_DATA:
      return getNewState(state, action.title, action.index, action.data);
    default:
      return state;
  }
}

function getNewState(state, title, index, data) {
  let newState = JSON.parse(JSON.stringify(state));

  let i = newState.tilesData.findIndex((item) => {
    return item.title === title;
  });

  let newItem = Object.assign({}, data);

  if(i === -1) {
    newState.tilesData.push({title: title, items: [newItem]});
  } else {
    let o = newState.tilesData[i]['items'];

    if(o === undefined || Object.prototype.toString.call(o) !== '[object Array]') {
      newState.tilesData[i]['items'] = [newItem];
    } else if(!index || index > o.length) {
      newState.tilesData[i]['items'].push(newItem);
    } else {
      newState.activeTitleIndex = i;
      newState.activeItemIndex = index;
      newState.tilesData[i]['items'][index] = newItem;
    }
  }

  return newState;
}
