import React, { Component, PropTypes } from 'react';

import InputNumber from '../../../Common/components/InputNumber';

import GridList from '../../../Common/components/GridList';

import { IconButton } from 'material-ui';

import { ContentAddCircle, ContentRemoveCircle} from 'material-ui/svg-icons/index';

export default class ProductNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  render() {
    return (
      <GridList cols={4}>
        <div style={{padding: '15px 0px 0px 3px', color: '#aaa'}}>{this.props.name}</div>
        <IconButton onTouchTap={e => {
          if(this.state.value > 1) {
            let newValue = this.state.value - 1;
            this.setState({value: newValue});
          }
        }}>
          <ContentRemoveCircle color='#12aabc'/>
        </IconButton>

        <InputNumber type='INT'
          style={{
            marginTop: 10
          }}
          value={this.state.value}
          onChange={(e, v) => {
            if(parseInt(v) < 1) {
              this.setState({value: 1});
            };
          }}/>

        <IconButton onTouchTap={e => {
          let newValue = this.state.value + 1;
          this.setState({value: newValue});
        }}>
          <ContentAddCircle color='#12aabc'/>
        </IconButton>
      </GridList>
    );
  }
}

ProductNumber.defaultProps = {
  value: 1,
  name: '数量'
};

ProductNumber.propTypes = {
  value: PropTypes.number,
  name: PropTypes.string
};
