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

import co from 'co';

require('babel-polyfill');

import { 
  addNode, 
  addProductItemData, 
  addPatternItemData, 
  addColorScheme,
  addProductColor,
  setProductColorActiveIndex,
  addTextColor, 
  addTextStroke, 
  addTextShadow,
  addCanvas
} from './actions';

let store = createStore(reducer);

// test data
// store.dispatch(addCanvas({
//   img: WEB_ROOT + 'Public/uploads/jyimages/bg01.jpg',
//   genius: WEB_ROOT + 'Public/uploads/jyimages/genius01_04.jpg',
//   clipSvg: WEB_ROOT + 'Public/uploads/jyimages/genius01_04.svg'
// }));
// store.dispatch(addCanvas({
//   img: WEB_ROOT + 'Public/uploads/jyimages/bg02.jpg',
//   genius: WEB_ROOT + 'Public/uploads/jyimages/genius01_05.jpg',
// }));
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
co(function *() {
  let pid = window.M_PROPS.pid || 1,
    diyid = window.M_PROPS.diyid;
  let mData;
  let response = yield axios.get(WEB_ROOT + '/index.php/Home/JY/getDiyData', {
      params: {
        pid: pid,
        diyid: diyid
      }
    }).catch((error) => {
      console.log(error);
    }); 
    mData = response.data;
    mData['pDatas'] = [];
    // console.log(mData);
    const mProjects = mData.projects,
      mMasks = mData.masks,
      mColors = mData.colors,
      mCols = Object.keys(mColors);

    // 添加产品颜色
    for(let mColor in mColors) {
      console.log(mColor);
      store.dispatch(addProductColor(mColor));
    }

    if(mProjects.length > 0) {
      store.dispatch(setProductColorActiveIndex(0)); // 设置当前激活的产品颜色ID
      for(let mProject of mProjects) {
        let res = yield axios.get(mProject).catch((error) => {
          console.log(error);
        });
        let eData = res.data;

        if(eData) {
          store.dispatch(addCanvas({
            img: eData['bgUrl'],
            clipSvg: eData['maskUrl']
          }));

          mData['pDatas'].push(eData.data);

          // 将界面产品颜色切换
          for(let j = 0; j < mCols.length; j ++) {
            if(mColors[mCols[j]][0] !== undefined && mColors[mCols[j]][0] === eData.bgUrl) {
              store.dispatch(setProductColorActiveIndex(j));
              break;
            }
          }
        }
      }
    } else if(mCols.length > 0) {
      store.dispatch(setProductColorActiveIndex(0)); // 设置当前激活的产品颜色ID
      const mColorImages = mColors[mCols[0]];
      for(let i = 0, l = mColorImages.length; i < l; i ++) {
        console.log(mColorImages[i]);
        store.dispatch(addCanvas({
          img: mColorImages[i],
          clipSvg: mMasks[i]
        }));
      }
    }

  ReactDOM.render(
    <Provider store={store}>
      <App productColorData={mData}/>
    </Provider>,
    document.getElementById('jy-app'));
});
