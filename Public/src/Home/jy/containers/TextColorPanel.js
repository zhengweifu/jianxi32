import React, { Component, PropTypes } from 'react';

import ColorGroup from '../components/ColorGroup';

import { Popover } from 'material-ui';

export default class TextColorPanel extends Component {
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <Popover
        open={this.props.open}
        anchorEl={this.props.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.handleRequestClose}
        >
      <ColorGroup
        activeIndex={this.props.activeIndex}
        onClick={(e, item, index) => {
          if(this.props.onClick) {
            this.props.onClick(e, item, index);
          }
        }}
        items={this.props.items}/>
      </Popover>
    );
  }
}

TextColorPanel.defaultProps = {
  open: true,
  anchorEl: null
};

TextColorPanel.propTypes = {
  open: PropTypes.bool,
  anchorEl: PropTypes.object,
  activeIndex: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onClick: PropTypes.func.isRequired
};
