import React from 'react';

import GridList from '../../../Common/components/GridList';

export default class BuyerShowPanel extends React.Component {
  renderItems() {
    return this.props.items.map((item, index) => {
      return (
        <div key={index} style={{
          border: '1px solid #ccc',
          height: 100
        }}></div>
      );
    });
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
      <span>人气买家秀</span>
      <span />
      <GridList cols={6}>
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
