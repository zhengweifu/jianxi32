import React, { Component, PropTypes } from 'react';

import ColorGroup from '../../../Common/components/ColorGroup';

// import { Popover, PopoverAnimationVertical } from 'material-ui';
import Popover from '../../../Common/components/Popover';

export default class ProductColorPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open
    };
  }

  componentWillReceiveProps(newProps) {
    if(newProps.open !== undefined) {
      this.setState({open: newProps.open});
    }
  }

  render() {
    return (
      <Popover
        open={this.state.open}
        onRequestClose={e => {
          // this.setState({
          //   open: false,
          // });

          if(this.props.onRequestClose) {
            this.props.onRequestClose(e);
          }
        }}
        style={{padding: '10px 5px', marginTop: 5, width: 400}}
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

ProductColorPanel.defaultProps = {
  open: false
};

ProductColorPanel.propTypes = {
  open: PropTypes.bool,
  activeIndex: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onClick: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired
};
