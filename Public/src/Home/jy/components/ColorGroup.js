import React from 'react';

import ColorItem from './ColorItem';

export default class ColorGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentActiveIndex: props.activeIndex
    };
  }

  onHandleClick(event, color) {

    let index = this.props.items.findIndex((c) => {
      return c === color;
    });

    this.setState({currentActiveIndex: index});

    if(this.props.onClick) {
      this.props.onClick(event, color);
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.activeIndex !== undefined) {
      this.state.currentActiveIndex = newProps.activeIndex;
    }
  }

  renderList() {
    return this.props.items.map((item, index) => {
      let paddingLeft = 0, paddingRight = 2;
      if(index == 0 || ((index + 1) % 13 == 0)) {
        paddingLeft = 15;
      } else if((index + 1) % 12 == 0) {
        paddingRight = 15;
      }

      return (
        <div key={index} className='col-xs-1' style={{
            textAlign: 'center',
            paddingLeft: paddingLeft,
            paddingRight: paddingRight
          }}>
          <ColorItem
            defaultBgColor={item}
            onClick={this.onHandleClick.bind(this)}
            active={this.state.currentActiveIndex === index ? true : false}
            width={28}
            height={28}
            />
        </div>
      );
    });
  }

  render() {
    return (
      <div className='row'>
        {this.renderList()}
      </div>
    );
  }
}

ColorGroup.defaultProps = {
  items: React.PropTypes.array.isRequired,
  activeIndex: React.PropTypes.number
};
