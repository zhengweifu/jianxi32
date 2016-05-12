import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from './containers/App.js';

import {createStore} from 'redux';

import {Provider} from 'react-redux';

import reducer from './reducers/index';

import { addNode, addProductItemData, addPatternItemData, addColorScheme, addTextColor } from './actions';

let store = createStore(reducer);

// test data
store.dispatch(addProductItemData('ATR1000系列短袖', {
  img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
  describtion: 'AIR1000男款'
}));

store.dispatch(addProductItemData('ATR1000系列短袖', {
  img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
  describtion: 'AIR1000女款'
}));

store.dispatch(addProductItemData('FLY996系列长袖', {
  img: '/jianxi32/Public/src/Home/jy/images/cs01.jpg',
  describtion: 'FLY996男款'
}));

store.dispatch(addProductItemData('FLY996系列长袖', {
  img: '/jianxi32/Public/src/Home/jy/images/cs01.jpg',
  describtion: 'FLY996女款'
}));

store.dispatch(addProductItemData('ATR3000系列短袖', {
  img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
  describtion: 'AIR3000女款'
}));

// store.dispatch(addProductItemData('ATR4000系列短袖', {
//   img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
//   describtion: 'AIR4000女款'
// }));

store.dispatch(addPatternItemData('动物', {
  img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
  describtion: '小狗'
}));

store.dispatch(addPatternItemData('动物', {
  img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
  describtion: '小猫'
}));

store.dispatch(addPatternItemData('动物', {
  img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
  describtion: '小鸡'
}));

store.dispatch(addPatternItemData('植物', {
  img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
  describtion: '小树'
}));

store.dispatch(addPatternItemData('书法', {
  img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
  describtion: '小树'
}));

store.dispatch(addPatternItemData('建筑', {
  img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
  describtion: '小树'
}));

// nodeData test data
store.dispatch(addNode({
  kind: '图片',
  describtion: '/jianxi32/Public/src/Home/jy/images/tx01.jpg'
}));

store.dispatch(addNode({
  kind: '文字',
  describtion: '我的名字叫大王'
}));

store.dispatch(addNode({
  kind: '图片',
  describtion: '/jianxi32/Public/src/Home/jy/images/tx01.jpg'
}));


// colorScheneData
store.dispatch(addColorScheme({describtion: '正常', img: '/jianxi32/Public/src/Home/jy/images/ps/normal.jpg'}));
store.dispatch(addColorScheme({describtion: '素描', img: '/jianxi32/Public/src/Home/jy/images/ps/sketch.png'}));
store.dispatch(addColorScheme({describtion: '美肤', img: '/jianxi32/Public/src/Home/jy/images/ps/softEnhancement.png'}));
store.dispatch(addColorScheme({describtion: '素描', img: '/jianxi32/Public/src/Home/jy/images/ps/sketch.png'}));
store.dispatch(addColorScheme({describtion: '美肤', img: '/jianxi32/Public/src/Home/jy/images/ps/softEnhancement.png'}));
store.dispatch(addColorScheme({describtion: '素描', img: '/jianxi32/Public/src/Home/jy/images/ps/sketch.png'}));

// textColorPanelData
store.dispatch(addTextColor('#ff0'));
store.dispatch(addTextColor('#f00'));
store.dispatch(addTextColor('#f0f'));
store.dispatch(addTextColor('#fe0'));
store.dispatch(addTextColor('#f10'));
store.dispatch(addTextColor('#f4f'));
store.dispatch(addTextColor('#f60'));
store.dispatch(addTextColor('#830'));
store.dispatch(addTextColor('#f8f'));
store.dispatch(addTextColor('#f80'));
store.dispatch(addTextColor('#f04'));
store.dispatch(addTextColor('#f02'));
store.dispatch(addTextColor('#3f0'));
store.dispatch(addTextColor('#500'));
store.dispatch(addTextColor('#70f'));

// console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
		<App />
	</Provider>,
  document.getElementById('jy-app'));
