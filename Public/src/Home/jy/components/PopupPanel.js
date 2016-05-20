import React, { Component, PropTypes } from 'react';

import { HardwareKeyboardArrowDown, HardwareKeyboardArrowRight} from 'material-ui/svg-icons';

export default class PopupPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      bodyHeight: props.bodyHeight
    };
  }

  componentWillReceiveProps(newProps) {
    if(newProps.open !== undefined) {
      this.setState({open: newProps.open});
    }
  }

  render() {
    let style = {
      boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.05)'
    };

    let headerStyle = {
      boxSizing: 'border-box',
      border: `1px solid ${this.props.borderColor}`,
      height: this.props.headerHeight + 2 * this.props.padding,
      backgroundColor: this.props.headerBgColor,
      borderTopLeftRadius: this.props.radius,
      borderTopRightRadius: this.props.radius,
      borderBottomLeftRadius: this.state.open ? 0 : this.props.radius,
      borderBottomRightRadius: this.state.open ? 0 : this.props.radius,
      fontWeight: 'bold',
      fontSize: 16,
      padding: this.props.padding
    };
    let bodyStyle = {
      boxSizing: 'border-box',
      borderLeft: `1px solid ${this.props.borderColor}`,
      borderRight: `1px solid ${this.props.borderColor}`,
      borderBottom: this.state.open ? `1px solid ${this.props.borderColor}` : 'none',
      broderTop: 'none',
      height: this.state.open ? this.state.bodyHeight + 2 * this.props.padding : 0,
      backgroundColor: this.props.bodyBgColor,
      borderBottomLeftRadius: this.props.radius,
      borderBottomRightRadius: this.props.radius,
      padding: this.state.open ? this.props.padding : 0,
      overflow: this.props.overflow,
      opacity: this.state.open ? 1 : 0,
      // display: this.state.open ? 'block' : 'none',
      transform: this.state.open ? 'scaley(1)' : 'scaley(0)',
      transformOrigin: '0 0',
      transition: 'all 0.3s ease-in-out'
    };
    return (
      <div style={Object.assign(style, this.props.style)}>
        <div style={Object.assign(headerStyle, this.props.headerStyle)} onTouchTap={e => {
          // this.setState({open: !this.state.open});
          let open = this.state.open;
          this.setState({open: !open});
          // let step = Math.floor(this.props.bodyHeight / 10);

          // let timer = setInterval(() => {
          //   if(open) {
          //     if(this.state.bodyHeight < step) {
          //       step = this.state.bodyHeight;
          //     }
          //     if (this.state.bodyHeight > 0) {
          //       this.setState({bodyHeight: this.state.bodyHeight - step});
          //     } else {
          //       this.setState({open: !this.state.open});
          //       clearInterval(timer);
          //     }
          //   } else {
          //     if(!this.state.open) {
          //       this.setState({open: !this.state.open});
          //     }
          //
          //     if(this.props.bodyHeight - this.state.bodyHeight < step) {
          //       step = this.props.bodyHeight - this.state.bodyHeight;
          //     }
          //     if (this.state.bodyHeight < this.props.bodyHeight) {
          //       this.setState({bodyHeight: this.state.bodyHeight + step});
          //     } else {
          //       clearInterval(timer);
          //     }
          //   }
          // }, 20);

          if(this.props.onTouchTap) {
            this.props.onTouchTap(e);
          }
        }}>{this.props.label}
          {this.state.open ? <HardwareKeyboardArrowDown style={{float: 'right'}}/> : <HardwareKeyboardArrowRight style={{float: 'right'}}/>}
        </div>
        <div style={Object.assign(bodyStyle, this.props.bodyStyle)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

PopupPanel.defaultProps = {
  open: false,
  overflow: 'auto',
  borderColor: '#ccc',
  headerHeight: 26,
  headerBgColor: '#eee',
  bodyHeight: 100,
  bodyBgColor: '#fff',
  radius: 2,
  padding: 5,
  style: {},
  headerStyle: {},
  bodyStyle: {}
};

PopupPanel.propTypes = {
  open: PropTypes.bool,
  overflow: PropTypes.string,
  label: PropTypes.string.isRequired,
  borderColor: PropTypes.string,
  headerHeight: PropTypes.number,
  headerBgColor: PropTypes.string,
  bodyHeight: PropTypes.number,
  bodyBgColor: PropTypes.string,
  radius: PropTypes.number,
  padding: PropTypes.number,
  style: PropTypes.object,
  headerStyle: PropTypes.object,
  bodyStyle: PropTypes.object,
};
