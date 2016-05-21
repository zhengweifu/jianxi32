import React, { Component, PropTypes } from 'react';

import PopupPanel from '../components/PopupPanel';

import InputNumberSliderGroup from '../components/InputNumberSliderGroup';

import { GridList, RaisedButton } from 'material-ui';

import { ToCenterV, ToCenterH } from '../core';

export default class GeneralPropertiesPanel extends Component {
  render() {
    let buttonStyle = {
      width: '100%',
    };

    let buttonBgColor = '#eee';
    return (
      <div>
        <div style={{paddingLeft: 5, paddingRight: 5, marginBottom: 20}}>
          <InputNumberSliderGroup defaultValue={0} max={360} min={-360} type='INT' label='位置 (x)'/>
          <InputNumberSliderGroup defaultValue={0} max={360} min={-360} type='INT' label='位置 (y)'/>
          <InputNumberSliderGroup defaultValue={0} max={360} min={-360} type='INT' label='旋转'/>

          <InputNumberSliderGroup defaultValue={1} max={5} min={-5} type='NUMBER' label='缩放 (x)'/>
          <InputNumberSliderGroup defaultValue={1} max={5} min={-5} type='NUMBER' label='缩放 (y)'/>
        </div>
        <GridList
          cols={4}
          padding={10}
          cellHeight={40}
          >
          <RaisedButton
            label='上移一层'
            backgroundColor={buttonBgColor}
            style={buttonStyle}
          />
          <RaisedButton
            label='下移一层'
            backgroundColor={buttonBgColor}
            style={buttonStyle}
          />
          <RaisedButton
            label='水平居中'
            backgroundColor={buttonBgColor}
            style={buttonStyle}
            onTouchTap={e => {
              ToCenterH();
            }}
          />
          <RaisedButton
            label='垂直居中'
            backgroundColor={buttonBgColor}
            style={buttonStyle}
            onTouchTap={e => {
              ToCenterV();
            }}
          />
        </GridList>
      </div>
    );
  }
}
