import React, { Component, PropTypes } from 'react';

import { GREY300 } from '../styles/colors';

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: props.activeIndex,
      items: props.items
    };
  }

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
    return this.state.items.map((item, index) => {
      return (
        <option key={index} value={item}>{item}</option>
      );
    });
  }

  componentWillReceiveProps(newProps) {
    if(newProps.activeIndex !== undefined) {
      this.setState({activeIndex: newProps.activeIndex});
    }

    if(newProps.items !== undefined) {
      this.setState({items: newProps.items});
    }
  }

  render() {

    let mvalue = this.state.items[this.state.activeIndex] ? this.state.items[this.state.activeIndex] : '';
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
      <select style={Object.assign({}, defaultStyle, this.props.style)} value={mvalue} onChange={e => {
        let val = e.target.value;
        let index = this.state.items.findIndex(item => item == val);
        this.setState({activeIndex: index});
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