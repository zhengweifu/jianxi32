import React, { Component, PropTypes } from 'react';

import InputNumberSlider from '../../../Common/components/InputNumberSlider';
import InputNumberSliderGroup from '../../../Common/components/InputNumberSliderGroup';

import VerticalSeparation from '../../../Common/components/VerticalSeparation';

import GridList from '../../../Common/components/GridList';

import Grid from '../../../Common/components/Grid';

import Col from '../../../Common/components/Col';

import { GREY500, ORANGE700 } from '../../../Common/styles/colors';

import { RaisedButton } from 'material-ui';

import { ToCenterV, ToCenterH } from '../core';

export default class GeneralPropertiesPanel extends Component {
  render() {
    let buttonStyle = {
      width: '100%',
    };

    let buttonBgColor = '#eee';

    return (
      <div>
        <VerticalSeparation gutter={30}>
          <InputNumberSliderGroup
            max={360}
            min={-360}
            labels={['x', 'y']}
            labelWidth={10}
            labelColor={ORANGE700}
            title='位置'
            defaults={[0, 0]}
          />
          <InputNumberSlider 
            defaultValue={0} 
            max={360} min={-360} 
            type='INT'
            labelFontSize={14} 
            label='旋转' labelWidth={60}/>

          <InputNumberSliderGroup
            lock={true}
            max={5}
            min={-5}
            labels={['x', 'y']}
            labelWidth={10}
            labelColor={ORANGE700}
            title='缩放'
            defaults={[1, 1]}
          />
          <GridList cols={4}>
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
        </VerticalSeparation>
      </div>
    );
  }
}
