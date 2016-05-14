import React from 'react';

import { TextField } from 'material-ui';

export default class InputNumber extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value : props.value,
      active: false
    };
  }

  onHandleChange(event) {
    let val = event.target.value, _vals = [];

    if(this.props.type === 'INT') {

      val = val.replace(/[^0-9\-]/g,'');
      let isNegative = false;
      // remove - (ex before)
      let _val = val.replace(/\-/g, '');
      if(val[0] === '-') {
        isNegative = true;
      }

      let isAdd = false;
      let isZero = true;
      for(let i = 0; i < _val.length; i ++) {
        if(!isAdd && _val[i] != 0) {
          isAdd = true;
          isZero = false;
        }

        if(isAdd) {
          _vals.push(_val[i]);
        }
      }
      // console.log()
      if(isZero && _val.length > 0) {
        _vals.push(0);
      } else {
        if(isNegative) { // 插入负号
          _vals.splice(0, 0, '-');
        }
      }

    } else if(this.props.type === 'NUMBER') {

      val = val.replace(/[^0-9\.\-]/g,'');

      // remove - (ex before)
      let _val = val.replace(/\-/g, '');
      if(val[0] === '-') {
        _val = '-' + _val;
      }

      // remove . (only one)
      let isDot = false;
      for(let i = 0; i < _val.length; i++) {
        if(_val[i] === '.') {
          if(!isDot) {
            _vals.push(_val[i]);
            isDot = true;
          }
        } else {
          _vals.push(_val[i]);
        }
      }
    } else {
      // todo
    }

    let ovalue = _vals.join('');

    this.setState({value: ovalue});

    if(this.props.onChange) {
      this.props.onChange(event, ovalue);
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.value !== undefined) {
      this.setState({
        value: newProps.value
      });
    }
  }

  render() {
    let defaultBorderColor = '#eee', activeBorderColor = 'rgb(0, 188, 212)';

    let style = {
      border: 'none',
      borderBottom: 'solid',
      borderWidth: this.state.active ? 2 : 1,
      borderColor: this.state.active ? activeBorderColor : defaultBorderColor,
      width: '100%',
      outline: 'none'
    };

    return (
      <input
        style={Object.assign(style, this.props.style)}
        value={this.state.value}
        onFocus={e => this.setState({active: true})}
        onBlur={e => this.setState({active: false})}
        onChange={this.onHandleChange.bind(this)}
      />
    );
  }
}

// <TextField
//   id='InputNumber'
//   floatingLabelText={this.props.floatingLabelText}
//   fullWidth={true}
//   value={this.state.value}
//   onChange={this.onHandleChange.bind(this)}
// />

InputNumber.defaultProps = {
    value: 0,
    type: 'NUMBER',
    floatingLabelText: '',
    style: {}
};

InputNumber.propTypes = {
  type: React.PropTypes.oneOf(['INT', 'NUMBER']),
  floatingLabelText: React.PropTypes.string,
  value: React.PropTypes.number,
  onChange: React.PropTypes.func,
  style: React.PropTypes.object,
};
