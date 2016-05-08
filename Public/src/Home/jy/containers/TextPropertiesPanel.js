import React, { Component, PropTypes } from 'react';

import PopupPanel from '../components/PopupPanel';

import InputNumberSliderGroup from '../components/InputNumberSliderGroup';

import ColorItem from '../components/ColorItem';

import { GridList, RaisedButton, TextField, SelectField, MenuItem } from 'material-ui';

import ReactGridLayout from 'react-grid-layout';

export default class TextPropertiesPanel extends Component {
  render() {
    let buttonStyle = {
      width: '100%',
    };

    let buttonBgColor = '#eee';

    let layout1 = [
      {i: '0', x: 0, y: 0, w: 2, h: 1, static: true},
      {i: '1', x: 2, y: 0, w: 1, h: 1, static: true},
      {i: '2', x: 3, y: 0, w: 1, h: 1, static: true},
      {i: '3', x: 4, y: 0, w: 1, h: 1, static: true},
    ];

    return (
      <PopupPanel label='文字属性' bodyHeight={280} overflow='hidden' open={true}>
        <TextField
          hintText='www.janexi.com'
          fullWidth={true}
        />
        <ReactGridLayout
          layout={layout1}
          width={400}
          rowHeight={50}
          cols={5}>
          <div key='0'>
            <div>字体</div>
            <SelectField
              value={1}
              fullWidth={true}
              onChange={e => {}}>
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
          </div>
          <div key='1' style={{textAlign: 'center'}}>
            <div style={{marginBottom: 10}}>颜色</div>
            <ColorItem />
          </div>
          <div key='2' style={{textAlign: 'center'}}>
            <div style={{marginBottom: 10}}>描边</div>
            <ColorItem />
          </div>
          <div key='3' style={{textAlign: 'center'}}>
            <div style={{marginBottom: 10}}>阴影</div>
            <ColorItem />
          </div>
        </ReactGridLayout>
        <div style={{paddingLeft: 5, paddingRight: 5, marginBottom: 20}}>
          <InputNumberSliderGroup defaultValue={12} max={20} min={5} type='INT' label='字号'/>
          <InputNumberSliderGroup defaultValue={1} max={10} min={0} type='INT' label='间距'/>
          <InputNumberSliderGroup defaultValue={0} max={360} min={-360} type='INT' label='弧度'/>
        </div>

      </PopupPanel>

    );
  }
}
