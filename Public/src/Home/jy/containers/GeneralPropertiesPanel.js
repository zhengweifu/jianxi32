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
          <VerticalSeparation gutter={25}>
            <Grid>
              <Col width={1 / 8}><div style={{marginTop: 16, color: GREY500, fontSize: 14, fontFamily: '"Times New Roman",Georgia,Serif'}}>位置</div></Col>
              <Col width={7 / 8}>
                <InputNumberSliderGroup
                  max={360}
                  min={-360}
                  labels={['x', 'y']}
                  labelWidth={10}
                  labelColor={ORANGE700}
                  defaults={[0, 0]}
                />
              </Col>
            </Grid>
            <InputNumberSlider 
              defaultValue={0} 
              max={360} min={-360} 
              type='INT'
              labelFontSize={14} 
              label='旋转' labelWidth={60}/>
            <Grid>
              <Col width={1 / 8}><div style={{marginTop: 16, color: GREY500, fontSize: 14, fontFamily: '"Times New Roman",Georgia,Serif'}}>缩放</div></Col>
              <Col width={7 / 8}>
                <InputNumberSliderGroup
                  lock={true}
                  max={5}
                  min={-5}
                  labels={['x', 'y']}
                  labelWidth={10}
                  labelColor={ORANGE700}
                  defaults={[1, 1]}
                />
              </Col>
            </Grid>
          
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
