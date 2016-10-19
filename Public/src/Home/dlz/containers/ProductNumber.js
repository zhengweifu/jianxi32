import React, { Component, PropTypes } from 'react';

import InputNumber from '../../../Common/components/InputNumber';

import GridList from '../../../Common/components/GridList';

import Grid from '../../../Common/components/Grid';

import Col from '../../../Common/components/Col';

import IconButton from '../../../Common/components/IconButton';
import SvgIcon from '../../../Common/components/SvgIcon';

import { addCircle, removeCircle } from '../../../Common/svgIcons/google/Content';

import { CYAN500, GREY500 } from '../../../Common/styles/colors';

export default class ProductNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  render() {
    return (
      <Grid>
        <Col width={1 / 4}>
          <div style={{color: GREY500, lineHeight: '24px', height: 24, verticalAlign: 'middle'}}>{this.props.name}</div>
        </Col>
        <Col width={1 / 2}>
          <GridList cols={3} center={true}>
            <IconButton
              padding={0}
              color={CYAN500}
              icon={<SvgIcon><path d={removeCircle}/></SvgIcon>}
              onClick={e => {
                if(this.state.value > 1) {
                  let newValue = this.state.value - 1;
                  this.setState({value: newValue});
                }
              }}/>
            <InputNumber type='INT'
              value={this.state.value}
              onChange={(e, v) => {
                if(parseInt(v) < 1) {
                  this.setState({value: 1});
                };
              }}/>
            <IconButton
              padding={0}
              color={CYAN500}
              icon={<SvgIcon><path d={addCircle}/></SvgIcon>}
              onClick={e => {
                let newValue = this.state.value + 1;
                this.setState({value: newValue});
              }}/>
          </GridList>
        </Col>
      </Grid>
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
