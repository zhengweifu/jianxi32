import React from 'react';

import { GridList } from 'material-ui';

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
      <GridList
        cols={6}
        colHeight={100}
        >
        {this.renderItems()}
      </GridList>
    );
  }
}

BuyerShowPanel.defaultProps = {
  items: []
};

BuyerShowPanel.propTypes = {
  items: React.PropTypes.array
};
