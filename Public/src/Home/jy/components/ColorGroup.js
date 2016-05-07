import React from 'react';

import ColorItem from './ColorItem';

import { GridList } from 'material-ui';

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
      return (
        <ColorItem
          key={index}
          defaultBgColor={item}
          onClick={this.onHandleClick.bind(this)}
          active={this.state.currentActiveIndex === index ? true : false}
          width={28}
          height={28}
          />
      );
    });
  }

  render() {
    return (
      <GridList
        cols={12}
        cellHeight={28}>
        {this.renderList()}
      </GridList>
    );
  }
}

ColorGroup.defaultProps = {
  items: React.PropTypes.array.isRequired,
  activeIndex: React.PropTypes.number
};
