import React from 'react';
import { RaisedButton, Popover, Menu, MenuItem } from 'material-ui';
import PopoverAnimationVertical from 'material-ui/Popover/PopoverAnimationVertical';

import { ImageImage } from 'material-ui/svg-icons';

export default class ButtonMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  onHandleTouchTap(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  onHandleRequestClose(event) {
    this.setState({
      open: false
    });
  }

  onItemClick(event, index) {
    this.onHandleRequestClose();
    if(this.props.onItemClick) {
      this.props.onItemClick(event, index);
    }
  }

  renderItem(items) {
    return items.map((item, index) => {
      return <div key={index}><RaisedButton
              style={{width: this.props.width}}
              label={item}
              onTouchTap={this.onItemClick.bind(this, event, index)}
              /></div>;
    });
  }

  render() {
    return (
      <div>
          <RaisedButton style={{width: this.props.width}}
            onTouchTap={this.onHandleTouchTap.bind(this)}
            label={this.props.name}
            backgroundColor={this.props.bgColor}
            labelColor={this.props.fbColor}
            icon={<ImageImage/>}
          />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.onHandleRequestClose.bind(this)}
            animation={PopoverAnimationVertical}
          >
            {this.renderItem(this.props.items)}
          </Popover>
        </div>
      );
  }
}

ButtonMenu.defaultProps = {
  name: 'www.janexi.com',
  items: ['fun.zheng'],
  width: 100
};

ButtonMenu.propTypes = {
  width: React.PropTypes.number,
  items: React.PropTypes.array.isRequired,
  name: React.PropTypes.string.isRequired,
  bgColor: React.PropTypes.string.isRequired,
  fbColor: React.PropTypes.string.isRequired,
  onItemClick: React.PropTypes.func
};
