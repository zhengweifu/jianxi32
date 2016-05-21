import React from 'react';

import { SvgIcon } from 'material-ui';

import { NavigationCheck } from 'material-ui/svg-icons';

export default class ColorItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: props.active
    };
  }

  renderDisable() {
    if(this.props.defaultBgColor === 'transparent') {
      return (
        <SvgIcon color='#f00' style={{
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          margin: this.props.width / 2 - 13}}>
          <path d="M24,1.4L1.4,24L0,22.6L22.6,0L24,1.4z" />
        </SvgIcon>
      );
    }
  }

  renderActive() {
    if(this.state.active) {
      return (
        <NavigationCheck color={this.props.activeColor}/>
      );
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.active !== undefined) {
      this.setState({active: newProps.active});
    }
  }

  render() {
    return (
      <div
        style={Object.assign({
          position: 'relative',
          width: this.props.width,
          height: this.props.height,
          borderRadius: 5,
          border: '1px solid',
          margin: 'auto',
          borderColor: this.state.active ? this.props.activeColor : this.props.defaultColor,
          backgroundColor: this.props.defaultBgColor
        }, this.props.style)}
        onClick={e => {
          if(!this.state.active) {
            this.setState({active: true});
          }

          if(this.props.onClick) {
            this.props.onClick(e, this.props.defaultBgColor);
          }

        }}
      >
        {this.renderDisable()}
        {this.renderActive()}
      </div>
    );
  }
}

ColorItem.defaultProps = {
  width: 30,
  height: 30,
  defaultBgColor: '#fff',
  defaultColor: '#ccc',
  activeColor: '#5d9be7',
  active: false,
  style: {}
};

ColorItem.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  defaultBgColor: React.PropTypes.string,
  defaultColor: React.PropTypes.string,
  activeColor: React.PropTypes.string,
  active: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  style: React.PropTypes.object
};
