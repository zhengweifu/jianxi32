import React from 'react';

export default class InputNumber extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value : props.value
    };
  }

  onHandleChange(event) {
    let val = event.target.value;
    val = val.replace(/[^0-9\.\-]/,'');

    // remove - (ex before)
    let _val = val.replace(/\-/g, '');
    if(val[0] === '-') {
        _val = '-' + _val;
    }

    // remove - (only one)
    let _vals = [];
    let isDot = false;
    for(var i = 0; i < _val.length; i++) {
        if(_val[i] === '.') {
            if(!isDot) {
                _vals.push(_val[i]);
                isDot = true;
            }
        } else {
            _vals.push(_val[i]);
        }
    }

    this.setState({value: _vals.join('')});

    this.props.onChange(event, this.state.value);
  }

  render() {
    return (
      <input
        type='text'
        className='form-control'
        value={this.state.value}
        onChange={this.onHandleChange.bind(this)}
        style={this.props.style}
        />
    );
  }
}

InputNumber.defaultProps = {
    value: 0
};

InputNumber.propTypes = {
  value: React.PropTypes.number,
  onChange: React.PropTypes.func,
  style: React.PropTypes.object
};
