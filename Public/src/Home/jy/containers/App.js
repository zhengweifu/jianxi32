import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import InputNumberSliderGroup from '../components/InputNumberSliderGroup';

import ButtonMenu from '../components/ButtonMenu';

import { Popover, RaisedButton, Menu, MenuItem } from 'material-ui';

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
        <InputNumberSliderGroup defaultValue={0} max={360} min={-360} />
        <InputNumberSliderGroup defaultValue={0.5} max={10} min={0} />
        <ButtonMenu
          name='选择图片'
          width={200}
          onItemClick={this.onHandleItemClick.bind(this)}
          items={[
            '本地上传',
            '剪切画'
          ]}/>
      </div>
      </MuiThemeProvider>
    );
  }
}
