import React from 'react';

import ProductPanel from './ProductPanel';

import { RaisedButton } from 'material-ui';

import { ImageDehaze } from 'material-ui/svg-icons/index';

export default class ProductHeaderPanel extends React.Component {
  render() {
    return (
      <div style={{position: 'relative'}}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0
        }}>
          <RaisedButton
          label='选择产品'
          onTouchTap={e => {
            this.refs.productPanel.getWrappedInstance().setState({open: true});
          }}
          icon={<ImageDehaze />}
          backgroundColor={this.props.bgColor}
          labelColor='#eee'/>
          <ProductPanel bgColor={this.props.bgColor} color='#eee' ref='productPanel' />
        </div>
        <div style={{
          paddingLeft: 130,
          height: 36,
          borderBottom: `2px solid ${this.props.bgColor}`}}>
          <div style={{
            paddingTop: 10,
            fontSize: 18
          }}>{this.props.productDescribtion}</div>
        </div>
      </div>
    );
  }
}


ProductHeaderPanel.defaultProps = {
  bgColor: '#f0f',
  productDescribtion: 'AIR100000000圆领 女款'
};

ProductHeaderPanel.propTypes = {
  bgColor: React.PropTypes.string
};
