import React, { Component, PropTypes } from 'react';

import ColorGroup from '../components/ColorGroup';

import { Popover } from 'material-ui';

export default class TextColorPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
      anchorEl: props.anchorEl
    };
  }

  componentWillReceiveProps(newProps) {
    if(newProps.open !== undefined) {
      this.setState({open: newProps.open});
    }
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'middle', vertical: 'top'}}
        onRequestClose={e => {
          this.setState({
            open: false,
          });

          if(this.props.onRequestClose) {
            this.props.onRequestClose(e);
          }
        }}
        style={{paddingTop: 10, paddingBottom: 10, marginTop: 5}}
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
  open: false,
  anchorEl: null
};

TextColorPanel.propTypes = {
  open: PropTypes.bool,
  anchorEl: PropTypes.object,
  activeIndex: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onClick: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired
};
