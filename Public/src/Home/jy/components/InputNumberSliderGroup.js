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

  componentWillReceiveProps(newProps) {
    if(newProps.defaultValue !== undefined) {
      this.setState({
        value: newProps.defaultValue
      });
    }
  }

  onSliderHandleChange(event, value) {
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
      <div style={{
        position: 'relative',
        height: 50
        }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 25,
          width: this.props.labelWidth
        }}>{this.props.label}</div>
        <div style={{
          position: 'absolute',
          left: this.props.labelWidth + 5,
          top: 20,
          width: this.props.inputWidth
          }}>
          <InputNumber
            value={this.state.value}
            onChange={this.onInputHandleChange.bind(this)}
            type={this.props.type}
            />
        </div>

        <Slider
          value={sliderValue}
          onChange={this.onSliderHandleChange.bind(this)}
          max={this.props.max}
          min={this.props.min}
          step={this.props.type === 'INT' ? 1 : 0.1}
          style={{
            position: 'absolute',
            top: 0,
            left: this.props.labelWidth + this.props.inputWidth + 10,
            right: 5,
            marginTop: 0,
            marginBottom: 0
          }}
          />
      </div>

    );
  }
}

InputNumberSliderGroup.defaultProps = {
  label: 'position',
  labelWidth: 65,
  inputWidth: 55,
};

InputNumberSliderGroup.propTypes = {
  label: React.PropTypes.string,
  labelWidth: React.PropTypes.number,
  inputWidth: React.PropTypes.number,
  onChange: React.PropTypes.func,
  defaultValue: React.PropTypes.number,
  type: React.PropTypes.oneOf(['INT', 'NUMBER']),
  max: React.PropTypes.number,
  min: React.PropTypes.number
};
