import React from 'react';
import InputNumber from './InputNumber';
import { Slider, GridList, GridTile } from 'material-ui';

export default class InputNumberSliderGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }
  onSliderHandleChange(event, value) {
    this.refs.inputNumber.setState({value: value});
    this.setState({value: value});

    if(this.props.onChange) {
      this.props.onChange(event, value);
    }
  }

  onInputHandleChange(event, value) {
    value = parseFloat(event.target.value);
    this.setState({value: value});

    if(this.props.onChange) {
      this.props.onChange(event, value);
    }
  }

  render() {
    let sliderValue = this.state.value;

    if(sliderValue > this.props.max) {
      sliderValue = this.props.max;
    } else if(sliderValue < this.props.min) {
      sliderValue = this.props.min;
    }

    return (
      <div className='row'>
        <div className='col-xs-2' style={{paddingLeft: 15, paddingRight: 5}}>
          <InputNumber
            value={this.state.value}
            onChange={this.onInputHandleChange.bind(this)}
            ref='inputNumber'
            type={this.props.type}
          />
        </div>
        <div className='col-xs-10' style={{paddingLeft: 5, padingRight: 15}}>
          <Slider
            value={sliderValue}
            onChange={this.onSliderHandleChange.bind(this)}
            max={this.props.max}
            min={this.props.min}
            step={this.props.type === 'INT' ? 1 : 0.1}
            style={{marginBottom: 24}}
            />
        </div>
      </div>
    );
  }
}

InputNumberSliderGroup.propTypes = {
  onChange: React.PropTypes.func,
  defaultValue: React.PropTypes.number,
  type: React.PropTypes.oneOf(['INT', 'NUMBER']),
  max: React.PropTypes.number,
  min: React.PropTypes.number
};
