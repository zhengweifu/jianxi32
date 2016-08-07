import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// var injectTapEventPlugin = require('react-tap-event-plugin');
// injectTapEventPlugin();

import App from './containers/App.js';

import { createStore } from 'redux';

import { Provider } from 'react-redux';

import reducer from './reducers/index';

import axios from 'axios';

import { WEB_ROOT, INTERFACE_ROOT } from '../../config';

// import co from 'co';

// require('babel-polyfill');

import { 
  addNode, 
  addProductItemData, 
  addPatternItemData, 
  addColorScheme, 
  addTextColor, 
  addTextStroke, 
  addTextShadow,
  addCanvas
} from './actions';

let store = createStore(reducer);

// test data
store.dispatch(addCanvas({
  img: WEB_ROOT + 'Public/uploads/jyimages/bg01.jpg',
  genius: WEB_ROOT + 'Public/uploads/jyimages/genius01_04.jpg',
  clipSvg: WEB_ROOT + 'Public/uploads/jyimages/genius01_04.svg'
}));
store.dispatch(addCanvas({
  img: WEB_ROOT + 'Public/uploads/jyimages/bg02.jpg',
  genius: WEB_ROOT + 'Public/uploads/jyimages/genius01_05.jpg',
}));
// 
// 
store.dispatch(addProductItemData('ATR1000系列短袖', {
  img: WEB_ROOT + 'Public/uploads/jyimages/tx01.jpg',
  describtion: 'AIR1000男款'
}));

store.dispatch(addProductItemData('ATR1000系列短袖', {
  img: WEB_ROOT + 'Public/uploads/jyimages/tx01.jpg',
  describtion: 'AIR1000女款'
}));

store.dispatch(addProductItemData('FLY996系列长袖', {
  img: WEB_ROOT + 'Public/uploads/jyimages/cs01.jpg',
  describtion: 'FLY996男款'
}));

store.dispatch(addProductItemData('FLY996系列长袖', {
  img: WEB_ROOT + 'Public/uploads/jyimages/cs01.jpg',
  describtion: 'FLY996女款'
}));

store.dispatch(addProductItemData('ATR3000系列短袖', {
  img: WEB_ROOT + 'Public/uploads/jyimages/tx01.jpg',
  describtion: 'AIR3000女款'
}));

// store.dispatch(addProductItemData('ATR4000系列短袖', {
//   img: WEB_ROOT + 'Public/uploads/jyimages/tx01.jpg',
//   describtion: 'AIR4000女款'
// }));


// store.dispatch(addPatternItemData('动物', {
//   img: WEB_ROOT + 'Public/uploads/jyimages/tx01.jpg',
//   describtion: '小狗'
// }));

// store.dispatch(addPatternItemData('动物', {
//   img: WEB_ROOT + 'Public/uploads/jyimages/tx01.jpg',
//   describtion: '小猫'
// }));

// store.dispatch(addPatternItemData('动物', {
//   img: WEB_ROOT + 'Public/uploads/jyimages/tx01.jpg',
//   describtion: '小鸡'
// }));

// store.dispatch(addPatternItemData('植物', {
//   img: WEB_ROOT + 'Public/uploads/jyimages/tx01.jpg',
//   describtion: '小树'
// }));

// store.dispatch(addPatternItemData('书法', {
//   img: WEB_ROOT + 'Public/uploads/jyimages/tx01.jpg',
//   describtion: '小树'
// }));

// store.dispatch(addPatternItemData('建筑', {
//   img: WEB_ROOT + 'Public/uploads/jyimages/tx01.jpg',
//   describtion: '小树'
// }));
axios.get(INTERFACE_ROOT + 'Home/JY/getShearPainting')
  .then(response => {
    let mShearPaintings = response.data;
    for(let kind in mShearPaintings) {
      for(let shearPainting of mShearPaintings[kind]) {
        store.dispatch(addPatternItemData(kind, {
          img: shearPainting.path,
          describtion: shearPainting.title
        }));
      }
    }
    // console.log(mShearPaintings);
  });

axios.get(INTERFACE_ROOT + 'Home/JY/getInitData')
  .then(response => {
    let mcolors = response.data.text_colors;
    for(let mcolor of mcolors) {
      // textColorPanelData
      store.dispatch(addTextColor('#' + mcolor.color));
      // textStrokePanelData
      store.dispatch(addTextStroke('#' + mcolor.color));
      // textShadowPanelData
      store.dispatch(addTextShadow('#' + mcolor.color));
    }

    let mColorSchemeDatas = response.data.color_scheme_datas;
    for(let mColorSchemeData of mColorSchemeDatas) {
      // console.log(mColorSchemeData);
      store.dispatch(addColorScheme(mColorSchemeData));
    }
  });
  
axios.post(INTERFACE_ROOT + 'Home/JY/test', {
  name: 'fun.zheng',
  age: 30
}, {

})
  .then(response => {
    console.log(response);
  });


// co(function *() {
//   let response = yield axios.get(WEB_ROOT + '/index.php/Home/JY/getInitData');
//   let mColors = response.data.text_colors;

//   for(let mColor of mColors) {
//     // textColorPanelData
//     store.dispatch(addTextColor('#' + mColor.color));
//     // textStrokePanelData
//     store.dispatch(addTextStroke('#' + mColor.color));
//     // textShadowPanelData
//     store.dispatch(addTextShadow('#' + mColor.color));
//   }

//   let mColorSchemeDatas = response.data.color_scheme_datas;
//   for(let mColorSchemeData of mColorSchemeDatas) {
//     console.log(mColorSchemeData);
//     store.dispatch(addColorScheme(mColorSchemeData));
//   }

// });

// class App extends Component {
//   render() {
//     return <h1>saaffwfw</h1>;
//   }
// }
  

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('jy-app'));
