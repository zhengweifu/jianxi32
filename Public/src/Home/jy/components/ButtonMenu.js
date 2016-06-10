import React from 'react';
// import { RaisedButton, Popover } from 'material-ui';
// import PopoverAnimationVertical from 'material-ui/Popover/PopoverAnimationVertical';
import VerticalSeparation from '../../../Common/components/VerticalSeparation';

import RaisedButton from '../../../Common/components/RaisedButton';

import Popover from '../../../Common/components/Popover';

// import { ImageImage } from 'material-ui/svg-icons';
import SvgIcon from '../../../Common/components/SvgIcon';

import { image } from '../../../Common/svgIcons/google/Image';

import { CYAN500, GREY500 } from '../../../Common/styles/colors';

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
              fullWidth={true}
              label={item}
              bgColor={CYAN500}
              onClick={this.onItemClick.bind(this, event, index)}
              /></div>;
    });
  }

  render() {
    return (
      <div>
          <RaisedButton
            fullWidth={true}
            onClick={this.onHandleTouchTap.bind(this)}
            label={this.props.name}
            bgColor={this.props.bgColor}
            labelColor={this.props.fbColor}
            leftIcon={<SvgIcon><path d={image}/></SvgIcon>}
          />
          <Popover
            open={this.state.open}
            onRequestClose={this.onHandleRequestClose.bind(this)}
          >
          <VerticalSeparation>
            {this.renderItem(this.props.items)}
          </VerticalSeparation>
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
