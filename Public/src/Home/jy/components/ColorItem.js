import React from 'react';

export default class ColorItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: props.active
    };
  }

  onHandleClick(event) {
    if(!this.state.active) {
      this.setState({active: true});
    }

    if(this.props.onClick) {
      this.props.onClick(event, this.props.defaultBgColor);
    }
  }

  renderActive() {
    if(this.state.active) {
      return (
        <a style={{
          textDecoration: 'none',
          fontFamily: 'Glyphicons Halflings',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: this.props.width / 2,
          width: this.props.width / 2,
          color: this.props.activeColor,
          display: 'block',
          margin: 'auto'
        }}>&#xe013;</a>
      );
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.active !== undefined) {
      this.state.active = newProps.active;
    }
  }

  render() {
    return (
      <div
        style={{
          width: this.props.width,
          height: this.props.height,
          borderRadius: 5,
          border: '1px solid',
          margin: 'auto',
          borderColor: this.state.active ? this.props.activeColor : this.props.defaultColor,
          backgroundColor: this.props.defaultBgColor
        }}
        onClick={this.onHandleClick.bind(this)}
      >
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
  active: false
};

ColorItem.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  defaultBgColor: React.PropTypes.string,
  defaultColor: React.PropTypes.string,
  activeColor: React.PropTypes.string,
  active: React.PropTypes.bool,
  onClick: React.PropTypes.func
};
