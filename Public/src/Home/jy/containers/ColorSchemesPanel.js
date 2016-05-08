import React, { Component, PropTypes } from 'react';

import PopupPanel from '../components/PopupPanel';

import SimpleItem from '../components/SimpleItem';

import ReactGridLayout from 'react-grid-layout';

export default class ColorSchemesPanel extends Component {
  renderItems() {
    
  }

  render() {
    let layout = [
      {i: '0', x: 0, y: 0, w: 1, h: 1, static: true},
      {i: '1', x: 1, y: 0, w: 1, h: 1, static: true},
      {i: '2', x: 2, y: 0, w: 1, h: 1, static: true},
      {i: '3', x: 3, y: 0, w: 1, h: 1, static: true}
    ];
    return (
      <PopupPanel label='色彩风格' bodyHeight={200} overflow='hidden' open={true}>
      <ReactGridLayout
        width={400}
        rowHeight={100}
        layout={layout}
        cols={4}>
        <div key='0'><SimpleItem title='素描'>
          <img src="ddfwfw.jpg" />
        </SimpleItem></div>
        <div key='1'><SimpleItem title='素描'>
          <img src="ddfwfw.jpg" />
        </SimpleItem></div>
      </ReactGridLayout>
      </PopupPanel>

    );
  }
}
