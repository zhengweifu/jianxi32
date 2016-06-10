import React from 'react';

import ProductPanel from './ProductPanel';

// import { RaisedButton } from 'material-ui';
import RaisedButton from '../../../Common/components/RaisedButton';

import SvgIcon from '../../../Common/components/SvgIcon';

import { dehaze } from '../../../Common/svgIcons/google/Image';

import Label from '../../../Common/components/Label';

// import { ImageDehaze } from 'material-ui/svg-icons/index';

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
          onClick={e => {
            this.refs.productPanel.getWrappedInstance().setState({open: true});
          }}
          leftIcon={<SvgIcon><path d={dehaze}/></SvgIcon>}
          bgColor={this.props.bgColor}
          labelColor='#eee'/>
          <ProductPanel bgColor={this.props.bgColor} color='#eee' ref='productPanel' />
        </div>
        <div style={{
          paddingLeft: 130,
          height: 40,
          borderBottom: `2px solid ${this.props.bgColor}`}}>
          <Label height={40} content={this.props.productDescribtion} fontSize={18}/>
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
