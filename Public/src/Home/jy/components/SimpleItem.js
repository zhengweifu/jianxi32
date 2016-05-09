import React, { Component, PropTypes} from 'react';

export default class SimpleItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: props.active
    };
  }

  onHandleClick(event) {
    this.setState({active: true});
    if(this.props.onClick) {
      let other = this.props.other ? this.props.other : null;
      this.props.onClick(event, this.props.title);
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
        onClick={this.onHandleClick.bind(this)}
        style={{
          padding: this.state.active ? 4 : 5,
          textAlign: 'center',
          border: this.state.active ? `1px solid ${this.props.activeColor}` : 'none'
        }}>
        {this.props.children}
        <div style={{fontSize: 12}}>{this.props.title}</div>
      </div>
    );
  }
}

SimpleItem.defaultProps = {
  active: false,
  activeColor: '#ccc'
};

SimpleItem.propTypes = {
  active: PropTypes.bool,
  activeColor: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
