import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import InputNumberSliderGroup from '../components/InputNumberSliderGroup';

import ButtonMenu from '../components/ButtonMenu';

import { Popover, RaisedButton, Menu, MenuItem } from 'material-ui';

import ColorGroup from '../components/ColorGroup';

import ProductPanel from './ProductPanel';

export default class App extends React.Component {
  onHandleItemClick(event, index) {
    switch (index) {
      case 0:
        console.log('This is 0.');
        break;
      case 1:
        console.log('This is 1.');
        break;
      default:
        console.log('No index.');
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        <InputNumberSliderGroup defaultValue={0} max={360} min={-360} type='INT'/>
        <InputNumberSliderGroup defaultValue={0.5} max={10} min={0} type='NUMBER'/>
        <ButtonMenu
          name='选择图片'
          width={200}
          onItemClick={this.onHandleItemClick.bind(this)}
          items={[
            '本地上传',
            '剪切画'
          ]}/>
        <ColorGroup
          activeIndex={1}
          ref='colorgroup'
          items={[
            '#ff0',
            '#f00',
            '#f0f',
            '#fe0',
            '#f10',
            '#f4f',
            '#f60',
            '#830',
            '#f8f',
            '#f80',
            '#f04',
            '#f02',
            '#3f0',
            '#500',
            '#70f'
          ]}/>

        <ColorGroup
          activeIndex={3}
          ref='scolorgroup'
          items={[
            '#ff0',
            '#f00',
            '#f0f',
            '#fe0',
            '#f10',
            '#f4f',
            '#f60',
            '#830',
            '#f8f',
            '#f80',
            '#f04',
            '#f02',
            '#3f0',
            '#500',
            '#70f'
          ]}
          onClick={(event, color) => {
            console.log(color);
          }}
          />

        <RaisedButton label='change color' onTouchTap={(event) => {
          this.refs.colorgroup.setState({currentActiveIndex: 3});
          this.refs.scolorgroup.setState({currentActiveIndex: 8});
        }}/>

        <ProductPanel bgColor='#ff8d5c' color='#eee' tilesData={[
          {
            title: 'ATR1000系列短袖',
            items: [{
              img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
              title: 'AIR1000男款'
            }, {
              img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
              title: 'AIR1000女款'
            }, {
              img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
              title: 'AIR1000女款'
            }, {
              img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
              title: 'AIR1000女款'
            }, {
              img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
              title: 'AIR1000女款'
            }, {
              img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
              title: 'AIR1000女款'
            }, {
              img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
              title: 'AIR1000女款'
            }, {
              img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
              title: 'AIR1000女款'
            }, {
              img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
              title: 'AIR1000女款'
            }]
          }, {
            title: 'FLY996系列长袖',
            items: [{
              img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
              title: 'FLY996男款'
            }, {
              img: '/jianxi32/Public/src/Home/jy/images/tx01.jpg',
              title: 'FLY996女款'
            }]
          }
        ]}/>
      </div>
      </MuiThemeProvider>
    );
  }
}
