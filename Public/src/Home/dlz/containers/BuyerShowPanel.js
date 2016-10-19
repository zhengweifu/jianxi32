import React from 'react';

import GridList from '../../../Common/components/GridList';

import Label from '../../../Common/components/Label';

import { GREY200 } from '../../../Common/styles/colors';

export default class BuyerShowPanel extends React.Component {
  renderItems() {
    return this.props.items.map((item, index) => {
      return (
        <div key={index} style={{
          border: `1px solid ${GREY200}`,
          height: 100
        }}></div>
      );
    });
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
      <Label content='人气买家秀'/>
      <span />
      <GridList cols={10}>
        {this.renderItems()}
      </GridList>
      </div>
    );
  }
}

BuyerShowPanel.defaultProps = {
  items: []
};

BuyerShowPanel.propTypes = {
  items: React.PropTypes.array
};
