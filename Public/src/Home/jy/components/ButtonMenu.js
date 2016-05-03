import React from 'react';
import { RaisedButton, Popover, Menu, MenuItem } from 'material-ui';

const style = {
  width: 300,
  textAlign: 'center'
};

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
    console.log(index);
    // this.onHandleRequestClose.bind(this, event);
    // if(this.props.onClilk) {
    //   this.props.onClick(event, index);
    // }
  }

  renderItem(items) {
    return items.map((item, index) => {
      console.log(this.onItemClick);
      return <MenuItem key={index} primaryText={item} onTouchTap={this.onItemClick.bind(this)} />;
    });
  }

  render() {
    return (
      <div>
          <RaisedButton
            onMouseUp={this.onHandleTouchTap.bind(this)}
            label={this.props.name}
            primary={true}

          />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.onHandleRequestClose.bind(this)}
          >
            <Menu>
              {this.renderItem(this.props.items)}
            </Menu>
          </Popover>
        </div>
      );
  }
}
