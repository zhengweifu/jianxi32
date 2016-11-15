import React, { Component, PropTypes } from 'react';

import { GREY300 } from '../styles/colors';

class Select extends Component {
  static propTypes = {
    items: PropTypes.array,
    activeIndex: PropTypes.number,
    style: PropTypes.object
  };

  static defaultProps = {
    activeIndex: 0,
    style: {}
  };

  renderItems() {
    return this.props.items.map((item, index) => {
      return (
        <option key={index} value={index}>{item}</option>
      );
    });
  }

  render() {
    const {
      items,
      activeIndex
    } = this.props;
    const defaultStyle = {
      width: '100%',
      height: 30,
      display: 'block',
      padding: '6px 12px',
      border: `1px solid ${GREY300}`,
      backgroundColor: '#fff',
      borderRadius: 4
    };
    return (
      <select style={Object.assign({}, defaultStyle, this.props.style)} value={activeIndex} onChange={e => {
        let val = e.target.value;
        let index = items.findIndex((item, index) => index == val);

        if(this.props.onChange) {
          this.props.onChange(e, val, index);
        }
      }}>
        {this.renderItems()}
      </select>
    );
  }
}

export default Select;